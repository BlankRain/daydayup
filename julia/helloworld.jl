println("Hello World~")

println(PROGRAM_FILE); for x in ARGS; println(x); end
# 全局常量 ARGS   PROGRAM_FILE

#  ~/.juliarc.jl
# If you have code that you want executed whenever Julia is run, you can put it in ~/.juliarc.jl:

# $ echo 'println("Greetings! 你好! 안녕하세요?")' > ~/.juliarc.jl
# $ julia
# Greetings! 你好! 안녕하세요?


1 # 变量
x=1
x=x+1 # 非函数式 非不变

0x1
0x123

0b10

1e10
1e2

1000_000
(typemin(Int32), typemax(Int32))

bits(2)


Char(120)
Int('a')
Int('\x7f')

str = "Hello, world.\n"
"""Contains "quote" characters"""
str[1]
str[2:end]

end endof(s)


for c in s
           println(c)
end

greet = "Hello"
whom = "world"
 "1 + 2 = $(1 + 2)"
"$greet, $whom.\n"
string(greet, ", ", whom, ".\n")


search("xylophone", 'x')
search("xylophone", 'o', 5)

contains("Hello, world.", "world")
repeat(".:Z:.", 10)

ismatch(r"^\s*(?:#|$)", "# a comment")

m = match(r"[0-9]","aaaa1aaaa2aaaa3",6)

julia> m = match(r"(a|b)(c)?(d)", "acd")
RegexMatch("acd", 1="a", 2="c", 3="d")

julia> m.match
"acd"

repeat([1 2;3 4],inner=(1,1),outer=(2,1))


replace("a", r".", s"\g<0>1")
