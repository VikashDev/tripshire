# README #
### What is this repository for? ###

* tripshire.com
* v1

### API end points ###
### /v1/api ###
Response format:
success:
{"status":"success","data":{}}
failure:
{"status":"false","error":{}}
### categories ###
### /v1/api/categories?key={{category name}} ### method=[GET](here if key is not provided it will give output from base category named by categories)
* DISCRIPTION: get category detail with childrens tree. 
Response format:
{"status":"success/false","data":{"_id":"","path":"","name":"","parent":""},"children":[{"_id":"","path":"","name":"","parent":"","children":[]}]}
### /v1/api/categories ### method=[POST]
* DISCRIPTION: post to add category :
{"file":{image file object for category image},"name":{category name string},"parent":{ parent category name string},"discription":{category discription string}}

### /v1/api/categories ### method=[PUT]
* DISCRIPTION: delete category body format:
{"name":{category current name string},"parent":{ parent category name string},"newname":{category newname string}}

### /v1/api/categories ### method=[DELETE]
* DISCRIPTION: delete category body format:
{id=""}
### Activities ###

### /v1/api/activites?key={{category name}} ### method=[GET](here if key is not provided it will give output from base category named by categories)
* DISCRIPTION: get category detail with childrens tree. 
Response format:
{"status":"success/false","data":{"_id":"","path":"","name":"","parent":""},"children":[{"_id":"","path":"","name":"","parent":"","children":[]}]}
### /v1/api/activites ### method=[POST]
* DISCRIPTION: post to add activity with auto detect geo:
					[{"file":{image file object for category image},"name": {activity name string},
							"category": {activity categories string},
							"tags": [string array],
              						"duration":{duration float value},
							"highlights": [string array],
							"attrs":[array of type {"key":{key name},"val":{key value}}]
							"address":String,
							"operator":[array of type				 			 								{"name":String,"website":String,"contact_no":String,"address":String,"rating":Number}
							],
						}]
### /v1/api/activites ### method=[POST]
* DISCRIPTION: post to add activity with provided geo:
					[{		
							"name": {activity name string},
							"category": {activity categories string},
							"tags": [string array],
              						"duration":{duration float value},
							"highlights": [string array],
							"geo":['latitude','longitude'],
							"attrs":[array of type {"key":{key name},"val":{key value}}]
							"address":String,
							"operator":[array of type				 			 								{"name":String,"website":String,"contact_no":String,"address":String,"rating":Number}
							],
						}]

### /v1/api/activites ### method=[PUT]
* DISCRIPTION: post to add activity with provided geo:

					[{		
							"name": {activity name string},
							"category": {activity categories string},
							"tags": [string array],
              						"duration":{duration float value},
							"highlights": [string array],
							"time":[{"open_time":"","close_time":""}],
							"geo":['latitude','longitude'],
							"attrs":[array of type {"key":{key name},"val":{key value}}]
							"address":String,
							"image_url":String,
							"wiki":{title:String,
								url:String,
								extract:String
								},
							"operator":[array of type				 			 								{"name":String,"website":String,"contact_no":String,"address":String,"rating":Number}
							]
						}]

### /v1/api/activites/:id ### method=[DELETE]
* DISCRIPTION: delete activity

### filters ###
filter response format
["status":"success","data":
{"_id":"","name":"","discription":"","category":{category id},"geo":[lat,long],"image_url":"image url","attrs":[],"wiki":[],"time":[{"open_time":"","close_time":""}],"address":[],"tags":[],"highlights":[],"operator":[{"name":"","website":"","contact_no":"","address":"","rating":number}]}
]
### /v1/api/activites/filter method=[GET] ###
### /v1/api/activities/filter/category?key={{category name}} ### method=[GET]
* DISCRIPTION: filter by category
### /v1/api/activities/filter/search?key={{field name}} ### method=[GET]
* DISCRIPTION: search for text in all fields
### /v1/api/activities/filter/duration?min={{min_time}}&max={{max_time}} ### method=[GET]
* DISCRIPTION: filter activities with recommended no of hour
### /v1/api/activities/filter/nearby?address={{address}}&distance={{distance in KM}} ### method=[GET]
* DISCRIPTION: get nearby activities in given max_distance
### /v1/api/activities/filter/category?key{{category name}} ### method=[GET]
* DISCRIPTION: filter by category
