<div align="center">

![Last commit](https://img.shields.io/github/last-commit/Comamoca/vim-morg?style=flat-square)
![Repository Stars](https://img.shields.io/github/stars/Comamoca/vim-morg?style=flat-square)
![Issues](https://img.shields.io/github/issues/Comamoca/vim-morg?style=flat-square)
![Open Issues](https://img.shields.io/github/issues-raw/Comamoca/vim-morg?style=flat-square)
![Bug Issues](https://img.shields.io/github/issues/Comamoca/vim-morg/bug?style=flat-square)

<img src="https://emoji2svg.deno.dev/api/🦊" alt="eyecatch" height="100">

# morg

Markdown editing support plugin. 

<br>
<br>

</div>

<div align="center">

</div>

## 🚀 How to use

```vim
call ddu#start(#{ sources: [#{ name: 'outline' }] })
```

> [!NOTE]
> Can search outline by Japanease when with use [ddu-filter-kensaku](https://github.com/Milly/ddu-filter-kensaku).


```vim
call ddc#custom#patch_global({
\     "outline": {
\       'matchers': ['matcher_kensaku'],
\     }}
```

### Example

Place the cursor over a code block and press `<leader>er` to execute the code block.

```vim
vim.api.nvim_create_autocmd("BufEnter", {
        pattern = {"*.md", "*.markdown"},
        callback = function ()
                vim.keymap.set("n", "<leader>er", "<cmd>call morg#run()<CR>")
        end
})
```

## API

### morg#context_codeblock

`morg#context_codeblock(...)`

Returns the language and code string of the code block under the cursor.
If the cursor is not in a code block, -1 is returned.

### morg#run

`morg#run()`

Run Quickrun with the code obtained with `morg#context_codeblock`.

### morg#tangle_all

`morg#tangle_all()`

Returns a string that converts all code blocks in the file into a single string.

### morg#tangle_block

`morg#tangle_block(...)`

This is equivalent to `call morg#context_codeblock().src`.

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
