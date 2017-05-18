
# extended_gcd(a, b) -> (x, y) such that ax + by = gcd(a, b)
using Numbers
using Primes
function extended_gcd{T <: Integer}(a::T, b::T)
  if mod(a, b) == zero(T)
    return [zero(T), one(1)]
  else
    x, y = extended_gcd(b, mod(a, b))
    return [y, x - (y * fld(a, b))]
  end
end

# modulo_inverse(a, n) -> b such that a * b = 1 [mod n]
function modulo_inverse(a::Integer, n::Integer)
  mod(first(extended_gcd(a, n)), n)
end

# totient(n) -> (p - 1) * (q - 1) such that pq is the prime factorization of n
totient{T <: Integer}(p::T, q::T) = (p - one(T)) * (q - one(T))

totient{T <: Integer}(n::T) = eulerphi(n)

# square(x) = x^2
square(x::Integer) = x * x

# modulo_power(base, exp, n) -> base^exp [mod n]
function modulo_power{T <: Integer}(base::T, exp::T, n::T)
  if exp == zero(T)
    one(T)
  else
    if isodd(exp)
      mod(base * modulo_power(base, exp - one(T), n), n)
    else
      mod(square(modulo_power(base, fld(exp, oftype(exp, 2)), n)), n)
    end
  end
end

# ---
# RSA routines
# ---

# A legal public exponent e is between
#  1 and totient(n), and gcd(e, totient(n)) = 1
function is_legal_public_exponent{T <: Integer}(e::T, p::T, q::T)
  return one(T) < e && e < totient(p, q) && one(T) == gcd(e, totient(p, q))
end

function is_legal_public_exponent{T <: Integer}(e::T, n::T)
  return one(T) < e && e <  n && one(T) == gcd(e, n)
end

# The private exponent is the inverse of the public exponent [mod n]
function private_exponent{T <: Integer}(e::T, p::T, q::T)
  if is_legal_public_exponent(e, p, q)
    return modulo_inverse(e, totient(p, q))
  else
    error("Not a legal public exponent for that modulus")
  end
end

# The private exponent is the inverse of the public exponent [mod n]
function private_exponent{T <: Integer}(e::T, n::T)
  if is_legal_public_exponent(e, n)
    return modulo_inverse(e, n)
  else
    error("Not a legal public exponent for that modulus .")
  end
end

# An encrypted message is c = m^e [mod n]
function encrypt{T <: Integer}(m::T, e::T, n::T)
  if m > n
    error("The modulus is too small to encrypt the message")
  else
    modulo_power(m, e, n)
  end
end

# A decrypted message is m = c^d [mod n]
function decrypt{T <: Integer}(c::T, d::T, n::T)
  return modulo_power(c, d, n)
end

# ---
# RSA example
# ---

p = BigInt(89) # A "large" prime
q = BigInt(97) # Another "large" prime
n = p * q      # The public modulus

e = BigInt(7)                 # The public exponent
# d = private_exponent(e, p ,q) # The private exponent
d = private_exponent(e, totient(n)) # The private exponent
for i in take( primes(2^100,2^200),3)
     println(i)
end

plaintext = BigInt(42)
ciphertext = encrypt(plaintext, e, n)

decrypted_ciphertext = decrypt(ciphertext, d, n)

@printf("The plaintext is:            %s\n", plaintext)

@printf("The ciphertext is:           %s\n", ciphertext)

@printf("The decrypted ciphertext is: %s\n", decrypted_ciphertext)

if plaintext != decrypted_ciphertext
  error("RSA fail!")
end
