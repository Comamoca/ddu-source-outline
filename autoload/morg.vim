if exists('g:loaded_blockrun')
  finish
endif

let g:loaded_blockrun = 1

const s:plugName = "morg"

" Returns the language and code string of the code block under the cursor.
" If the cursor is not in a code block, -1 is returned.
function! morg#context_codeblock(...) abort
        let linePos = get(a:, "1", line("."))

        return denops#request(s:plugName, 'context_codeblock', [linePos])
endfunction

" Run Quickrun with the code obtained with `morg#context_codeblock`.
function! morg#run() abort
        return denops#request(s:plugName, 'run', [])
endfunction

" Returns a string that converts all code blocks in the file into a single string.
function! morg#tangle_all() abort
        return denops#request(s:plugName, 'tangleAll', [])
endfunction

" This is equivalent to `call morg#context_codeblock().src`.
function! morg#tangle_block() abort
        return morg#context_codeblock().src
endfunction
