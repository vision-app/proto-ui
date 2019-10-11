const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const YAML = require('yaml');
function compareHeader(a, b) {
    return parseInt(a[a.length - 1]) - parseInt(b[b.length - 1]);
}
class ComponentMeta {
    constructor({
        name, attrParser, evtParser, slotsParser, methodsParser,
    }) {
        this.attrParser = attrParser;
        this.evtParser = evtParser;
        this.slotsParser = slotsParser;
        this.methodsParser = methodsParser;
        this.name = name;
    }

    toYaml() {
        const obj = {
            name: this.name,
            ...this.attrParser.toYamlObject(),
            ...this.slotsParser.toYamlObject(),
            ...this.evtParser.toYamlObject(),
            ...this.methodsParser.toYamlObject(),
        };

        Object.keys(obj).forEach((key) => {
            const item = obj[key];
            if (Array.isArray(item) && !item.length)
                delete obj[key];
        });

        return obj;
    }
}

const walkSync = function (dirinput, iterator) {
    const dirs = [dirinput];

    while (dirs.length) {
        const dir = dirs.shift();
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const f = path.join(dir, file);
            const stat = fs.statSync(f);
            if (stat && stat.isDirectory()) {
                dirs.push(f);
            }
            if (stat) {
                iterator(dir, file, stat);
            }
        });
    }
};
const iterator = function (dir, file, stat) {
    const fullPath = `${dir}/${file}`;
    if (/\.vue\/.+?\.vue\//.test(dir))
        return;

    if (/\.vue\/README\.md$/.test(fullPath) || /\.vue\/docs\/api\.md$/.test(fullPath)) {
        const markdown = new MarkdownIt({
            html: true,
            langPrefix: 'lang-',
        });

        const content = fs.readFileSync(fullPath, { encoding: 'utf8' });
        try {
            const tokens = markdown.parse(content);
            const metas = parseToken(tokens, dir, file);

            if (metas.length > 0)
                fs.writeFileSync(
                    path.resolve(dir.replace(/\/docs$/, ''), 'api.yaml'),
                    YAML.stringify(metas.map((m) => m.toYaml())));
        } catch (err) {
            console.log(err);
        }
    }
};

const camelToDash = (s) =>
    s.replace(/\.?([A-Z])/g, (x, y) => '-' + y.toLowerCase()).replace(/^-/, '');
const resolveName = function (name, dir, file) {
    if (name === 'API') {
        let p = dir;
        while (!/\.vue/.test(path.basename(p))) {
            p = path.dirname(p);
        }
        return path.basename(p, '.vue');
    } else {
        return `${camelToDash(name.split(' ')[0])}`;
    }
};
const parseToken = function (tokens, dir) {
    let idx = 0;
    const l = tokens.length;

    const components = [];
    do {
        if (tokens[idx] && tokens[idx].type === 'heading_open' && tokens[idx].tag === 'h2') {
            const attrParser = new AttrBlockParser();
            const evtParser = new EventsParser();
            const slotsParser = new SlotsBlockParser();
            const methodsParser = new MethodsBlockParser();
            idx++;
            let name = tokens[idx].content;
            let flag = true;
            do {
                if (tokens[idx] && tokens[idx].type === 'heading_open') {
                    if (compareHeader(tokens[idx].tag, 'h2') <= 0)
                        break;
                    else {
                        idx++;
                        const f = idx;
                        idx = attrParser.parse(tokens, idx);
                        idx = evtParser.parse(tokens, idx);
                        idx = slotsParser.parse(tokens, idx);
                        idx = methodsParser.parse(tokens, idx);
                        if (f === idx) {
                            flag = false;
                            break;
                        }
                    }
                } else {
                    idx++;
                }
            } while (idx < l);
            if (flag) {
                name = resolveName(name, dir);
                components.push(new ComponentMeta({
                    name, attrParser, evtParser, slotsParser, methodsParser,
                }));
            }
        } else {
            idx++;
        }
    } while (idx < l);

    return components;
};

class MethodsBlockParser {
    constructor() {
        this.title = 'methods';
        this.methods = [];
    }

    parse(tokens, idx) {
        if (tokens[idx] && tokens[idx].type === 'inline' && /methods/.test(tokens[idx].content.toLowerCase())) {
            const l = tokens.length;
            const htag = tokens[idx - 1].tag;
            let curTable = null;
            do {
                if (tokens[idx].type === 'paragraph_open') {
                    idx++;
                    this.methods[this.methods.length - 1].description = tokens[idx].content;
                    idx++;
                } else if (tokens[idx].type === 'table_open') {
                    idx = curTable.parse(tokens, idx);
                } else if (tokens[idx].type === 'heading_open') {
                    if (compareHeader(tokens[idx].tag, htag) <= 0)
                        break;
                    else {
                        idx++;
                        const name = tokens[idx].content;
                        curTable = new TableParser();
                        this.methods.push({
                            name,
                            table: curTable,
                        });
                    }
                } else {
                    idx++;
                }
            } while (idx < l);
        }
        return idx;
    }

    toYamlObject() {
        return {
            methods: this.methods.map(({ name, description, table }) => ({
                name,
                description,
                params: table.toYamlObject(),
            })),
        };
    }
}

class SlotsBlockParser {
    constructor() {
        this.title = 'slots';
        this.slots = [];
    }

    parse(tokens, idx) {
        if (tokens[idx] && tokens[idx].type === 'inline' && /slots/.test(tokens[idx].content.toLowerCase())) {
            const l = tokens.length;
            const htag = tokens[idx - 1].tag;
            do {
                if (tokens[idx].type === 'paragraph_open') {
                    idx++;
                    if (this.slots.length > 0) {
                        this.slots[this.slots.length - 1].description = tokens[idx].content;
                        idx++;
                    }
                } else if (tokens[idx].type === 'heading_open') {
                    if (compareHeader(tokens[idx].tag, htag) <= 0)
                        break;
                    else {
                        idx++;
                        let name = tokens[idx].content;
                        if (name === '(default)')
                            name = 'default';

                        this.slots.push({
                            name,
                        });
                        idx++;
                    }
                } else {
                    idx++;
                }
            } while (idx < l);
        }
        return idx;
    }

    toYamlObject() {
        return {
            slots: this.slots,
        };
    }
}

class AttrBlockParser {
    constructor() {
        this.table = null;
        this.title = 'attrs';
    }

    parse(tokens, idx) {
        if (tokens[idx] && tokens[idx].type === 'inline' && /attrs/.test(tokens[idx].content.toLowerCase())) {
            const l = tokens.length;
            do {
                if (tokens[idx].type === 'table_open') {
                    const parser = new TableParser();
                    idx = parser.parse(tokens, idx);
                    this.table = parser;
                } else if (tokens[idx].type === 'heading_open') {
                    break;
                } else {
                    idx++;
                }
            } while (idx < l);
        }
        return idx;
    }

    toYamlObject() {
        if (!this.table)
            return {};
        return {
            attrs: this.table.toYamlObject(),
        };
    }
}

class EventsParser {
    constructor() {
        this.title = 'events';
        this.events = [];
    }

    parse(tokens, idx) {
        if (tokens[idx] && tokens[idx].type === 'inline' && /events/.test(tokens[idx].content.toLowerCase())) {
            const l = tokens.length;
            const htag = tokens[idx - 1].tag;
            let curTable = null;
            do {
                if (tokens[idx].type === 'paragraph_open') {
                    idx++;
                    this.events[this.events.length - 1].description = tokens[idx].content;
                    idx++;
                } else if (tokens[idx].type === 'table_open') {
                    idx = curTable.parse(tokens, idx);
                } else if (tokens[idx].type === 'heading_open') {
                    if (compareHeader(tokens[idx].tag, htag) <= 0)
                        break;
                    else {
                        idx++;
                        const evtName = tokens[idx].content;
                        curTable = new TableParser();
                        this.events.push({
                            evtName,
                            table: curTable,
                        });
                    }
                } else {
                    idx++;
                }
            } while (idx < l);
        }
        return idx;
    }

    toYamlObject() {
        const p = {
            events: this.events.map(({ evtName, description, table }) => ({
                name: evtName,
                description,
                params: table.toYamlObject(),
            })),
        };
        return p;
    }
}

class TableParser {
    constructor() {
        this.keys = [];
        this.values = [];
    }

    parseInlineTh(tokens, idx) {
        if (tokens[idx].type === 'inline') {
            this.keys.push(tokens[idx].content);
            idx++;
        }
        return idx;
    }

    parseInlineTd(tokens, idx) {
        if (tokens[idx].type === 'inline') {
            this.values.push(tokens[idx].content);
            idx++;
        }
        return idx;
    }

    parseTh(tokens, idx) {
        if (tokens[idx].type === 'th_open') {
            idx++;
            idx = this.parseInlineTh(tokens, idx);
        }
        if (tokens[idx].type === 'th_close') {
            idx++;
            if (tokens[idx].type === 'th_open') {
                idx = this.parseTh(tokens, idx);
            }
        }
        return idx;
    }

    parseTd(tokens, idx) {
        if (tokens[idx].type === 'td_open') {
            idx++;
            idx = this.parseInlineTd(tokens, idx);
        }
        if (tokens[idx].type === 'td_close') {
            idx++;
            if (tokens[idx].type === 'td_open') {
                idx = this.parseTd(tokens, idx);
            }
        }
        return idx;
    }

    parseTr(tokens, idx) {
        if (tokens[idx].type === 'tr_open') {
            idx++;
            idx = this.parseTh(tokens, idx);
            idx = this.parseTd(tokens, idx);
        }
        if (tokens[idx].type === 'tr_close') {
            idx++;
            if (tokens[idx].type === 'tr_open') {
                idx = this.parseTr(tokens, idx);
            }
        }
        return idx;
    }

    parseThead(tokens, idx) {
        if (tokens[idx].type === 'thead_open') {
            idx++;
            idx = this.parseTr(tokens, idx);
        }
        if (tokens[idx].type === 'thead_close') {
            idx++;
        }
        return idx;
    }

    parseTbody(tokens, idx) {
        if (tokens[idx].type === 'tbody_open') {
            idx++;
            idx = this.parseTr(tokens, idx);
        }
        if (tokens[idx].type === 'tbody_close') {
            idx++;
        }
        return idx;
    }

    parse(tokens, idx) {
        if (tokens[idx].type === 'table_open') {
            idx++;
            idx = this.parseThead(tokens, idx);
            idx = this.parseTbody(tokens, idx);
        }
        if (tokens[idx].type === 'table_close') {
            idx++;
        }
        return idx;
    }

    toYamlObject() {
        const rslt = [];
        for (let i = 0; i < this.values.length; i += this.keys.length) {
            const obj = {};
            this.keys.forEach((k, j) => {
                obj[k] = this.values[i + j];
            });
            rslt.push(obj);
        }
        return rslt;
    }
}

// parseTable(tokens, 0)

/**
 * parseToken2
 * @param {*} curr token
 * @param {*} next token
 */

walkSync(path.resolve(__dirname, '../src/components'), iterator);
