
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



(defn ok []
  (let [c1 (chan)
        c2 (chan)]
     (thread (while true
                (let [[v ch] (alts!! [c1 c2])]
                  (spit "a.log" (str "Read" v "from" ch)))))
     [c1 c2]))


(let [c (chan)
      begin (System/currentTimeMillis)
      _ (thread (do (<!! (timeout 1000)) (>!! c "ok")))
      _ (println "I'm ok")
      [v ch] (alts!! [c (timeout 3000)])]
  (println v)
  
  (println "Gave up after" (- (System/currentTimeMillis) begin)))

