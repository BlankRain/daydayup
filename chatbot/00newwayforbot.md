一种新的ChatBot观~

现在的ChatBot和AI走的一个路线~ 基本上是监督的非监督的各种分类. 线性的非线性的各种算法. 数学上的东西不同的应用吧.
杀猪杀尾巴~ 我有一种新的杀法.叫做Big REPL.
就是把交互看做一个REPL~ REPL是Read eval print loop的缩写.
啥意思呢? 就是我读进一段输入,执行,输出结果.如此往复. 为啥加个Big? 因为Bot这玩意的的确确还是很复杂的. 比Big Data还要复杂些.
我这Big REPL的套路,逻辑上是可以滴~ 给每个用户启个REPL,预加载一些炸包. 就可以愉快的玩耍了.
难点在于,我需要一个很强大的编译器~ 用户的输入,我得想办法把它解析出来. 这是一套巨复杂DSL~
路漫漫其修远兮~编译器,我们走~

现在各个语言的语法结构基本是固定的. 不按套路写,编译器是不通过的. 但是chatbot里~ 用户是没有错的. so~ 情况要逆转了.
这编译器得要能动态修改编译规则. 感觉像个宏.如此说来,说来如此~ 还有好多坑要填.
此处需要静静的悲伤一小会儿~
2017年4月9日20:38:18