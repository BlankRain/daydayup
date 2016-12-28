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
(typemin(Int32), typemax(Int32))
