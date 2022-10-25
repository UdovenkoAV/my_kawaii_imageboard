
export const reBold = /(\B\*\*[^\*{2}]+\*\*\B|\b__[^_{2}]+__\b)/;
export const reItalic = /(\B\*[^\*]+\*\B|\b_[^_]+_\b)/;
export const rePre = /(`[\S\s]+`)/;
export const reQuote = /((?<!>)(?!>>)>.+)/;
export const reWebLinks = /(^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$)/;
export const rePostLinks = /(&gt;&gt;\d+#\d+)/;
export const reReplyNum = /(?<=&gt;&gt;)\d+(?=#)/;
export const rePerentLink = /(?<=#)\d+/;
export const reDate = /.*(?=T)/;
export const reTime = /(?<=T).*(?=\.)/;
