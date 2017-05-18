(ns blankrain.rsa 
    (:require [clojure.math.combinatorics :as comb]
              [clojure.set :as set])
    (use [clojure.math.numeric-tower]))

(defn- mult-of-neibr-of-sixers? [n]
  (loop [[d & more] (range 6 (+ (sqrt n) 2) 6)]
    (if-not (nil? d)
      (if (zero? (* (rem n (inc d)) (rem n (dec d))))
        true
        (recur more))
      false)))

(defn- subsets
  "It's better to use math.combinatorics/subsets, instead. That is faster for large numbers."
  ([s]
     (if (empty? s)
       '(())
       (subsets (first s) (next s) (conj () ()))))
  ([curr s res]
     (loop [cres res nres res]
       (cond
        (not (nil? cres)) (recur (next cres) (conj nres (conj (first cres) curr)))
        (not (nil? s)) (subsets (first s) (next s) nres)
        :else nres))))

(defn prime?
  "An efficient trial and error approach -- very inefficient for large primes."
  [n]
  (if (<= n 1)
    false
    (if (or (== n 2) (== n 3))
      true
      (if (zero? (* (rem n 2) (rem n 3)))
        false
        (not (mult-of-neibr-of-sixers? n))))))

(defn next-prime
  "It checks the primality using prime?, for every odd number > n"
  [n]
  (let [n (bigint n)]
    (if (< n 2)
      2
      (loop [k (if (odd? n) (+ n 2) (inc n))]
        (if (prime? k)
          k
          (recur (+ k 2)))))))

(defn- next-nprimes
  "A trivial and straight forward approach. Throws exception for n > 100."
  [from n]
  (if (< (* from n) 0)
    (throw (Exception. "Both 'from' and 'n' must be positive."))
    (if (> n 100)
      (throw (Exception. "Range exceeded the limit of 100."))
      (->> (iterate next-prime from) rest (take n) sort))))

(defn prime-factors
  "A trivial and straight forward approach. Very inefficient for large numbers."
  [n]
  (if (< 1 n)
    (loop [n n
           fcts ()
           d 2]
      (let [q (quot n d)]
        (cond
         (< q d) (sort (conj fcts n))
         (zero? (rem n d)) (recur q (conj fcts d) d)
         :else (recur n fcts (inc d)))))
    '()))

(defn factors [n]
  (let [ subs (comb/subsets (prime-factors n))]
    (loop [[f & more] subs
           res #{}]
         (if-not (nil? f)
           (recur more (conj res (reduce * f)))
           (sort res)))))

(defn tau [n]
  (count (factors n)))

(defn sigma [n]
  (reduce + (factors n)))

(defn mobius [n]
  (let [pfacts (prime-factors n)]
    (let [tot-pfacts (count pfacts)
          tot-dist-pfacts (count (distinct pfacts))]
      (if (== tot-pfacts tot-dist-pfacts)
        (cond
         (and (even? tot-pfacts) ) 1
         :else -1)
        0))))

(defn totient
  "Euler totient function."
  [n]
  (if (prime? n)
    (dec n)
    (reduce + (for [d (factors n)]
                       (* (mobius d) (/ n d))))))

(defn practical? [n]
  (if-not (or (even? n) (== n 1))
    false
    (let [[f & more] (reverse (prime-factors n))]
      (loop [p f ps more sig (sigma (reduce * more))]
        (cond         
         (nil? ps) true
         (>= p (+ sig 1)) false
         :else (recur (first ps) (next ps) (sigma (reduce * (next ps)))))))))

(defn- expmod
  [base exp m]
  (cond
   (== exp 0) 1  
   (even? exp) (rem (expt (expmod base (/ exp 2) m) 2) m)
   :else (rem (* base (expmod base (- exp 1) m)) m)))

(defn pseudoprime?
  "Returns true, if n is Fermat Pseudoprime to base b. Returns false, otherwise or if n is prime."
  [n b]  
  (if (or (prime? n) (== n 1))
    false
    (== (expmod b n n) b)))

(defn- random
  "Returns a random bigint, such that 1 <= a < n"
  [n]
  (bigint (bigdec (+ (floor (* (rand) n)) 1))))

(defn fermably-prime?
  [n t]
  (let [b (random n) t (int t)]
    (cond
     (== t 0) true
     (== (expmod b n n) b) (recur n (dec t))
     :else false )))

(defn- precarmich-check
  [n]
  (if (or (even? n) (zero? (mobius n)))
    false
    (let [ps (prime-factors n)]
      (if (< (count ps) 3)
        false
        ps))))

(defn carmichael?
  "Returns true if the number is Carmichael number, using Korselt's criterion, otherwise returns false."
  [n]
  (if-let [ps (precarmich-check n)]
    (loop [divs (map dec ps)
           k (dec n)]
      (if-not (empty? divs)
        (when (zero? (rem k (first divs)))          
          (recur (rest divs) k))
        true))
    false
    ))

(defn mangoldt
  [n]
  (let [fcts (distinct (prime-factors n))]
    (if (== 1 (count fcts))
      (Math/log (first fcts))
      0)))

(defn chebyshev-psi
  [n]  
  (reduce + (for [x (range 1 (inc n))]
              (mangoldt x))))

(defn chebyshev-theta
  [n]
  (reduce + (for [ x  (range 1 (inc n)) 
                   :let [p? (prime? x)]
                   :when (true? p?)]
               (Math/log x))))

(defn fld "Largest integer less than or equal to x/y." [a b]
    (int (Math/floor (/ a b))))

(defn extended-gcd [a b]
    (if (= 0 (mod a b)) 
        [0 1]
        (let [[x y] (extended-gcd b (mod a b))]
            [y,(- x (* y (fld a b)))])))
 
 
 
(defn module-inverse "(modulo_inverse a, n) => b such that a * b = 1 [mod n]" [a n]
    (mod (first (extended-gcd a n)) n))
 
(defn square [x]
    (* x x)) 


(defn module-power "base^exp [mod n]" [base exp n]
    (expmod base exp n))
 

(defn is-legal-public-exponent "1 and totient(n), and gcd(e, totient(n)) = 1" [e n]
    (and (and (< 1 e) (< e n)) (= 1 (gcd e n))))

(defn private-exponent [e n]
    (if (is-legal-public-exponent e n)  
        (module-inverse e n)
        (throw (ex-info "Not a legal public exponent for that modulus" {}))))


(defn encrypt "An encrypted message is c = m^e [mod n]" [ m e n]
    (if (> m n) 
        (throw (ex-info "The module is too small to encrypt the message" {}))
        (module-power m e n)))

(defn decrypt "A decrypted message is m = c^d [mod n]" [c d n]
    (module-power c d n))

(defn rsa-demo []
    (let [p 89
          q 97
          n (* p q)
          taun (totient n) ;;欧拉函数 
          eset (filter #(is-legal-public-exponent % taun) (range 1 taun))
          e (rand-nth eset);; 随机取个e 65537
          d (private-exponent e taun) ;; 计算出d
          plaintext 66
          ciphertext (encrypt plaintext e n)
          decrypted_ciphertext (decrypt ciphertext d n)]
        (map println [e d plaintext ciphertext decrypted_ciphertext])))


(defn rsa-pir-key []
"MIICXgIBAAKBgQC0e0SjFRHvG6HCI10k9WD3MCAwSNApwDtVq1BRp/gS1ns/9U7V
xGoQkWX625ynVRkMPr5Fsj3vxt0TbeXi/R02YMh/bhJQOravSnFJ3ruq+cJCYSwp
NpTCPxnKXVV/OtVEFrdbm0P+nvpmE9DRO9aG3uqn1RL3UvWU+2IqImFjLwIDAQAB
AoGAfVOf/PMTqgtxD0PJWXG/bMcRgxX83xEq4rl8o8dU/5fKrEYnAVBMKsccns9D
f/sa0qL7M6CrW8anG+fTnAUR89VtzispyV58RCLMHhCxhYVqF5j86IbyqQd0qSDj
6VuovYVPV1PpwjLkJnFuXaklbdYlEHBRtlscdX+swQCnMnkCQQDwRmzYFdlyGrXj
rk/uHnAY/o/d1WiXLaAbtF/S4SxPl91jRrn24vLKMrxhXCNQC8FyZeSHdgWEnRkm
/pLBIrFbAkEAwEsPT+mdyxSwVxUlMY9lcdeTsRj3oJVHChE9+uRSSpISU85BMhFT
CxcBW56kr+ew1Qw6JsrTdXB+mLWPDszJvQJBAJzR+jxWlmOI12pQ3M5Xg2Zsz01D
+k2hc7xhT6F9YcRZJB+li759hWU/FACfeFTIN2wI4M0g1J0nQ8FVqkbv870CQQCJ
ujkxZ4ZZWmwjM0X8hVSHgXyLL/LM1Z6YG1llRfua5Zyy4dvYXIg6PTP/x1T1mOES
9zr/Ze6nAvfpsMDSPOORAkEAsJhKMcx1yqanIhKQp06MrqEAxPYNcGtW+FvJurZ6
KBAK6LDSXINv2Ih7Oy7RawJr3Hw0t1jTSfg2hPBkdaJOEQ==")

(defn rsa-pub-key []
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0e0SjFRHvG6HCI10k9WD3MCAw
SNApwDtVq1BRp/gS1ns/9U7VxGoQkWX625ynVRkMPr5Fsj3vxt0TbeXi/R02YMh/
bhJQOravSnFJ3ruq+cJCYSwpNpTCPxnKXVV/OtVEFrdbm0P+nvpmE9DRO9aG3uqn
1RL3UvWU+2IqImFjLwIDAQAB")


(defn readPublicKey-fromFile [file]
  (readPublicKey (slurp file :encoding "utf8")))

(defn readPublicKey [strin]
  (let [str (.replaceAll strin"(-+BEGIN PUBLIC KEY-+\\r?\\n|-+END PUBLIC KEY-+\\r?\\n?)" "")
        pub (.decodeBuffer (sun.misc.BASE64Decoder.) str)
        spec (java.security.spec.X509EncodedKeySpec. pub)
        pubk (.generatePublic (java.security.KeyFactory/getInstance "RSA" ) spec )]
      pubk))

(defn readPrivateKey [str]
  ;  DerInputStream derReader = new DerInputStream(Base64.getDecoder().decode(privateKeyPem))
  (let [derReader (sun.security.util.DerInputStream. (.decode (java.util.Base64/getDecoder) (.replaceAll str "\\s"  "")))
        [_ modulu publicExp privateExp prime1 prime2 exp1 exp2 crtCoef] (doall (map #(.getBigInteger %) (.getSequence derReader 0)))
         keySpec (java.security.spec.RSAPrivateCrtKeySpec. modulu, publicExp, privateExp, prime1, prime2, exp1, exp2, crtCoef)
         prik (.generatePrivate (java.security.KeyFactory/getInstance "RSA" ) keySpec )]
       prik))
       
       

(defn scaffold [interface]
    (doseq [[iface methods] (->> interface .getMethods 
                                (map #(vector (.getName (.getDeclaringClass %))
                                        (symbol (.getName %))
                                        (count (.getParameterTypes %))))
                                (group-by first))]
        (println (str "         " iface))
        (doseq [[_ name argcount] methods]
            (println 
                (str "      "
                    (list name (into '[this] (take argcount (repeatedly gensym)))))))))
  
