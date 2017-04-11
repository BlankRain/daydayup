// 文本解析 可以看作 Stream<Char> -> ResultTree的过程

class TextState {
    ResultTree leftTree;
    Stream<Char> rightChars;
}


所以~ 解析器是这么个函数
  parse ( begin : TextState) => end :TextState

和正则表达式 状态机有点像哈~

动作只有一个,
从右流里面取一个字出来,添加到左树上去.

所谓语法规则,就是添加规则.