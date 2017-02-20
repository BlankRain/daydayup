Java 开发环境设置及部分命令说明

1. 概念
  JDK： Java Development Kit Java开发工具
  JRE:  Java Runtime Env    Java运行环境
  区别: 想运行Java程序得要JRE,想开发Java程序得JDK.
        不能只开发不运行,所以JDK里包含了JRE. JDK是一份套餐~ JRE是单点.
2. 获取JDK
  下载地址 http://www.oracle.com/technetwork/java/javase/downloads/index.html
3. 安装
  闭着眼睛点下一步就行了
4. 环境变量配置
  - 环境变量说明
    啥是环境变量?
    普通的电脑是一堆硬件. 为了方便管理硬件,得要操作系统.
    操作系统提供这几个功能:
      - 进程管理（Processing management）
      - 内存管理（Memory management）
      - 文件系统（File system）
      - 网络通讯（Networking）
      - 安全机制（Security）
      - 用户界面（User interface）
      - 驱动程序（Device drivers）

    我们刚开机,啥也不运行的时候,开任务管理器,我们会看到也有一堆程序在跑.
    这些都是操作系统要跑的程序.shell 呢,不仅仅是壳牌公司,也是用户交互的界面，也是控制系统的脚本语言.
    关于语法层面的,就不提了.shell 脚本可以自己看看.
    环境变量呢,其实是shell 里面的东西.
    就是变量,存一些值,程序要用.
    然后这些变量有具体的约定.
    比如 path,
    比如 classpath.
    path是shell查找程序的路径,因为大家敲命令的时候不是全路径敲,全路径太累. 那就配个path
    变量告诉程序,你去那里给我找. 配了图个方便,你也可以不配,直接上全路径,但是不配会不方便.

  - 如何配置
    windows下:
    看这个链接吧,有图有真相.

    [走起](http://www.runoob.com/java/java-environment-setup.html)
  - 脚本配置
    [网上搜的脚本](http://www.cnblogs.com/flowwind/p/4066146.html)
      ```
        @echo off

      :: TODO:设置java环境变量
      :: Author: Gwt
      color 02
      ::设置java的安装路径，可方便切换不同的版本
      set input=
      set /p "input=请输入java的jdk路径（或回车默认路径为C:\Program Files\Java\jdk1.7.0_71）:"
      if defined input (echo jdk已设置) else (set input=C:\Program Files\Java\jdk1.7.0_71)
      echo jdk路径为%input%
      set javaPath=%input%

      ::如果有的话，先删除JAVA_HOME
      wmic ENVIRONMENT where "name='JAVA_HOME'" delete

      ::如果有的话，先删除ClASS_PATH
      wmic ENVIRONMENT where "name='CLASS_PATH'" delete

      ::创建JAVA_HOME
      wmic ENVIRONMENT create name="JAVA_HOME",username="<system>",VariableValue="%javaPath%"

      ::创建CLASS_PATH
      wmic ENVIRONMENT create name="CLASS_PATH",username="<system>",VariableValue=".;%%JAVA_HOME%%\lib\tools.jar;%

      %JAVA_HOME%%\lib\dt.jar;"

      ::在环境变量path中，剔除掉变量java_home中的字符，回显剩下的字符串
      call set xx=%Path%;%JAVA_HOME%\jre\bin;%JAVA_HOME%\bin

      ::echo %xx%

      ::将返回显的字符重新赋值到path中
      wmic ENVIRONMENT where "name='Path' and username='<system>'" set VariableValue="%xx%"

      pause
        ```
  - 没配置环境变量前,为啥windows下java可以,javac就不可以.

    因为在C:\Windows\System32 下面有个Java命令.

    C:\Windows\System32 默认是在path里面的.

好了,完了~
