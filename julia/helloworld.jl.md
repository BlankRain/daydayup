helloworld.jl.md

Intn -2^(n-1) ~~ 2^(n-1) -1
UIntn  0 ~~ 2^n -1



Sys.WORD_SIZE
ARGS   
PROGRAM_FILE

The underscore _ can be used as digit separator:

julia> 10_000, 0.000_000_005, 0xdead_beef, 0b1011_0010
(10000,5.0e-9,0xdeadbeef,0xb2)


bits 函数 二进制

Numeric Literal Coefficients
 x = 3
 2x^2 - 3x + 1
 1.5x^2 - .5x + 1

error: (x-1)(2x+1)
 (x-1)*(2x+1)


isa(8,Int)
 Function	Tests if
isequal(x, y)	x and y are identical
isfinite(x)	x is a finite number
isinf(x)	x is infinite
isnan(x)	x is not a number



The middle expression is only evaluated once, rather than twice as it would be if the expression were written as v(1) < v(2) && v(2) <= v(3)


sqrt(x) √x



Function	Description
div(x,y)	truncated division; quotient rounded towards zero
fld(x,y)	floored division; quotient rounded towards -Inf
cld(x,y)	ceiling division; quotient rounded towards +Inf
rem(x,y)	remainder; satisfies x == div(x,y)*y + rem(x,y); sign matches x
mod(x,y)	modulus; satisfies x == fld(x,y)*y + mod(x,y); sign matches y
mod1(x,y)	mod() with offset 1; returns r∈(0,y] for y>0 or r∈[y,0) for y<0, where mod(r, y) == mod(x, y)
mod2pi(x)	modulus with respect to 2pi; 0 <= mod2pi(x)  < 2pi
divrem(x,y)	returns (div(x,y),rem(x,y))
fldmod(x,y)	returns (fld(x,y),mod(x,y))
gcd(x,y...)	greatest positive common divisor of x, y,...
lcm(x,y...)	least positive common multiple of x, y,...
Sign and absolute value functions
Function	Description
abs(x)	a positive value with the magnitude of x
abs2(x)	the squared magnitude of x
sign(x)	indicates the sign of x, returning -1, 0, or +1
signbit(x)	indicates whether the sign bit is on (true) or off (false)
copysign(x,y)	a value with the magnitude of x and the sign of y
flipsign(x,y)	a value with the magnitude of x and the sign of x*y
Powers, logs and roots
Function	Description
sqrt(x) √x	square root of x
cbrt(x) ∛x	cube root of x
hypot(x,y)	hypotenuse of right-angled triangle with other sides of length x and y
exp(x)	natural exponential function at x
expm1(x)	accurate exp(x)-1 for x near zero
ldexp(x,n)	x*2^n computed efficiently for integer values of n
log(x)	natural logarithm of x
log(b,x)	base b logarithm of x
log2(x)	base 2 logarithm of x
log10(x)	base 10 logarithm of x
log1p(x)	accurate log(1+x) for x near zero
exponent(x)	binary exponent of x
significand(x)	binary significand (a.k.a. mantissa) of a floating-point number x



In order to compute trigonometric functions with degrees instead of radians, suffix the function with d. For example, sind(x) computes the sine of x where x is specified in degrees. The complete list of trigonometric functions with degree variants is:

sind   cosd   tand   cotd   secd   cscd
asind  acosd  atand  acotd  asecd  acscd




ismatch(r"^\s*(?:#|$)", "# a comment")

m = match(r"[0-9]","aaaa1aaaa2aaaa3",6)

julia> m = match(r"(a|b)(c)?(d)", "acd")
RegexMatch("acd", 1="a", 2="c", 3="d")

julia> m.match
"acd"


replace("a", r".", s"\g<0>1")


 r"a+.*b+.*?d$"ism


  r"a+.*b+.*?d$"ism


   r"a+.*b+.*?d$"ism
  i   Do case-insensitive pattern matching.

      If locale matching rules are in effect, the case map is taken
      from the current locale for code points less than 255, and
      from Unicode rules for larger code points. However, matches
      that would cross the Unicode rules/non-Unicode rules boundary
      (ords 255/256) will not succeed.

  m   Treat string as multiple lines.  That is, change "^" and "$"
      from matching the start or end of the string to matching the
      start or end of any line anywhere within the string.

  s   Treat string as single line.  That is, change "." to match any
      character whatsoever, even a newline, which normally it would
      not match.

      Used together, as r""ms, they let the "." match any character
      whatsoever, while still allowing "^" and "$" to match,
      respectively, just after and just before newlines within the
      string.

  x   Tells the regular expression parser to ignore most whitespace
      that is neither backslashed nor within a character class. You
      can use this to break up your regular expression into
      (slightly) more readable parts. The '#' character is also
      treated as a metacharacter introducing a comment, just as in
      ordinary code.


if v"0.2" <= VERSION < v"0.3-"


function f(x,y)
  x + y
end
f(x,y) = x + y


Expression	Calls
[A B C ...]	hcat()
[A, B, C, ...]	vcat()
[A B; C D; ...]	hvcat()
A'	ctranspose()
A.'	transpose()
1:n	colon()
A[i]	getindex()
A[i]=x	setindex!()


map(x -> x^2 + 2x - 1, [1,3,-1])

function foo(a,b)
         a+b, a*b
 end;

function plot(x, y; style="solid", width=1, color="black")
    ###
end



map(x->begin
           if x < 0 && iseven(x)
               return 0
           elseif x == 0
               return 1
           else
               return x
           end
       end,
    [A, B, C])


    map([A, B, C]) do x
        if x < 0 && iseven(x)
            return 0
        elseif x == 0
            return 1
        else
            return x
        end
    end


    z = begin
        x = 1
        y = 2
        x + y
      end
  z = (x = 1; y = 2; x + y)
  function test(x,y)
     if x < y
       relation = "less than"
     elseif x == y
       relation = "equal to"
     end
     println("x is ", relation, " y.")
   end

   for j = 1:5
         println(j)
       end



       Note that the Task() constructor expects a 0-argument function. A common pattern is for the producer to be parameterized, in which case a partial function application is needed to create a 0-argument anonymous function. This can be done either directly or by use of a convenience macro:

       function mytask(myarg)
           ...
       end

       taskHdl = Task(() -> mytask(7))
       # or, equivalently
       taskHdl = @task mytask(7)
       produce() and consume() do not launch threads that can run on separate CPUs. True kernel threads are discussed under the topic of Parallel Computing.

       Core task operations
       While produce() and consume() illustrate the essential nature of tasks, they are actually implemented as library functions using a more primitive function, yieldto(). yieldto(task,value) suspends the current task, switches to the specified task, and causes that task’s last yieldto() call to return the specified value. Notice that yieldto() is the only operation required to use task-style control flow; instead of calling and returning we are always just switching to a different task. This is why this feature is also called “symmetric coroutines”; each task is switched to and from using the same mechanism.

       yieldto() is powerful, but most uses of tasks do not invoke it directly. Consider why this might be. If you switch away from the current task, you will probably want to switch back to it at some point, but knowing when to switch back, and knowing which task has the responsibility of switching back, can require considerable coordination. For example, produce() needs to maintain some state to remember who the consumer is. Not needing to manually keep track of the consuming task is what makes produce() easier to use than yieldto().

       Task states
       Tasks have a state field that describes their execution status. A task state is one of the following symbols:

       Symbol	Meaning
       :runnable	Currently running, or available to be switched to
       :waiting	Blocked waiting for a specific event
       :queued	In the scheduler’s run queue about to be restarted
       :done	Successfully finished executing
       :failed	Finished with an uncaught exception
