－　创建项目
lein new luminus killer +mysql +re-frame +swagger
－　准备SQL
  修改　resources/migrations 里的sql文件
-　运行SQL
lein run migration
lein migratus

- 引入toucan包
[toucan "1.1.3"]

(ns some.model.brain
 (:require [toucan.models :refer [defmodel]]))

(defmodel Brain :users) 
 
 
(ns some.core
  (:require [toucan.db :as db]
            [some.model.brain :refer Brain])
        
(defn set-up []
 (db/set-default-db-connection! (env :database-url))
 (db/set-default-quoting-style! :mysql))
 
(defn all-users []
  (Brain))

