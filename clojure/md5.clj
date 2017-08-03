(defn msg-digest
  "Generate a key checksum for the given string"
  [key token]
  (let [hash-bytes
         (doto (java.security.MessageDigest/getInstance key)
               (.reset)
               (.update (.getBytes token)))]
       (.toString
         (new java.math.BigInteger 1 (.digest hash-bytes)) ; Positive and the size of the number
         16)))
(def md5 (partial msg-digest "MD5"))
(def sha1 (partial msg-digest "sha1"))
