<div align="center">

![Last commit](https://img.shields.io/github/last-commit/Comamoca/ddu-source-outline?style=flat-square)
![Repository Stars](https://img.shields.io/github/stars/Comamoca/ddu-source-outline?style=flat-square)
![Issues](https://img.shields.io/github/issues/Comamoca/ddu-source-outline?style=flat-square)
![Open Issues](https://img.shields.io/github/issues-raw/Comamoca/ddu-source-outline?style=flat-square)
![Bug Issues](https://img.shields.io/github/issues/Comamoca/ddu-source-outline/bug?style=flat-square)

<img src="https://emoji2svg.deno.dev/api/🦊" alt="eyecatch" height="100">

# ddu-source-outline

Ddu source for markdown outline.

<br>
<br>

</div>

<div align="center">

</div>

## 🚀 How to use

```vim
call ddu#start(#{ sources: [#{ name: 'outline' }] })
```

> ![Note] Can search outline by Japanease when with use
> [ddu-filter-kensaku](https://github.com/Milly/ddu-filter-kensaku).

```vim
call ddc#custom#patch_global({
\     "outline": {
\       'matchers': ['matcher_kensaku'],
\     }}
```

## ⛏️ Development

```sh
# Check
deno check *.ts

# Format
deno fmt
```

## 📝 Todo

- [ ] Move remarkParse to `deps.ts`.

## 📜 License

MIT

### 🧩 Modules

- [remark](https://github.com/remarkjs/remark)
