define({ "api": [
  {
    "type": "get",
    "url": "/api/chatrooms",
    "title": "GET rooms[]",
    "version": "0.0.1",
    "name": "_",
    "group": "Chatroom",
    "description": "<p>Get all chatrooms of current user</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>Table:ChatRooms</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Bobs_ID",
            "description": "<p>Table:ChatRooms</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>TimeStamp</p> ",
            "optional": false,
            "field": "Added",
            "description": "<p>Table:ChatRooms</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/chatrooms.js",
    "groupTitle": "Chatroom"
  },
  {
    "type": "post",
    "url": "/api/chatrooms",
    "title": "POST room",
    "version": "0.0.1",
    "name": "newRoom",
    "group": "Chatroom",
    "description": "<p>Add a new room</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Users_ID",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Bobs_ID",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/chatrooms.js",
    "groupTitle": "Chatroom"
  },
  {
    "type": "get",
    "url": "/api/chatrooms/:id",
    "title": "GET room comments",
    "version": "0.0.1",
    "name": "room_comments",
    "group": "Chatroom",
    "description": "<p>Get chatcomments from room</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>Table:ChatComments</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "ChatRooms_ID",
            "description": "<p>Table:ChatComments</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Comment",
            "description": "<p>Table:ChatComments</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Users_ID",
            "description": "<p>Table:ChatComments/Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Users_Firstname",
            "description": "<p>Table:Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Users_Lastname",
            "description": "<p>Table:Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Users_Email",
            "description": "<p>Table:Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Users_Cellphone",
            "description": "<p>Table:Users</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/chatrooms.js",
    "groupTitle": "Chatroom"
  },
  {
    "type": "get",
    "url": "/api/trips",
    "title": "GET trips[]",
    "version": "0.0.1",
    "name": "_",
    "group": "Trips",
    "description": "<p>Get all trips of current user</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Trips_ID",
            "description": "<p>Table: Trips</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Trips_CurrentLocation",
            "description": "<p>Table: Trips, {latitude:&quot;&quot;,longitude:&quot;&quot;}</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "r",
            "description": "<p>Trips_Bobs_ID Table: Trips</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Users_ID",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Destinations_ID",
            "description": "<p>Table: Users_Destinations/Trips</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Destinations_Location",
            "description": "<p>Table: Users_Destinations, {latitude:&quot;&quot;,longitude:&quot;&quot;}</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Cities_ID",
            "description": "<p>Table: Cities/Destinations</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Cities_Name",
            "description": "<p>Table: Cities</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "Default",
            "description": "<p>Table: Users_Destinations</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Timestamp</p> ",
            "optional": false,
            "field": "Added",
            "description": "<p>Table: Users_Destinations</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Name",
            "description": "<p>Table: Users_Destinations</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/trips.js",
    "groupTitle": "Trips"
  },
  {
    "type": "get",
    "url": "/api/trips/current",
    "title": "GET CurrentTrip",
    "version": "0.0.1",
    "name": "current",
    "group": "Trips",
    "description": "<p>Get trip of current user</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Trips_ID",
            "description": "<p>Table: Trips</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Trips_CurrentLocation",
            "description": "<p>Table: Trips, {latitude:&quot;&quot;,longitude:&quot;&quot;}</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Trips_Bobs_ID",
            "description": "<p>Table: Trips</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Users_ID",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Destinations_ID",
            "description": "<p>Table: Users_Destinations/Trips</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Destinations_Location",
            "description": "<p>Table: Users_Destinations, {latitude:&quot;&quot;,longitude:&quot;&quot;}</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Cities_ID",
            "description": "<p>Table: Cities/Destinations</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Cities_Name",
            "description": "<p>Table: Cities</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "Default",
            "description": "<p>Table: Users_Destinations</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Timestamp</p> ",
            "optional": false,
            "field": "Added",
            "description": "<p>Table: Users_Destinations</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Name",
            "description": "<p>Table: Users_Destinations</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/trips.js",
    "groupTitle": "Trips"
  },
  {
    "type": "get",
    "url": "/api/user/",
    "title": "GET user",
    "version": "0.0.1",
    "name": "_",
    "group": "User",
    "description": "<p>Get small info about current user</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "ID",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Firstname",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Lastname",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Email",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Cellphone",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "IsBob",
            "description": "<p>Table: Users</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/user/login",
    "title": "PUT Register",
    "version": "0.0.1",
    "name": "edit",
    "group": "User",
    "description": "<p>Edit a currentuser</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Firstname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Lastname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "Cellphone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "FacebookID",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "IsBob",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>DoublePrecision</p> ",
            "optional": true,
            "field": "PricePerKm",
            "description": "<p>Table: Bobs</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Integer</p> ",
            "optional": true,
            "field": "BobsType_ID",
            "description": "<p>Table: Bobs</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "LicensePlate",
            "description": "<p>Table: Bobs</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Integer</p> ",
            "optional": true,
            "field": "AutoType_ID",
            "description": "<p>Table: Bobs</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "POST Login",
    "version": "0.0.1",
    "name": "login",
    "group": "User",
    "description": "<p>Login the user</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Password",
            "description": "<p>Gehashed</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/logoff",
    "title": "POST Logoff",
    "version": "0.0.1",
    "name": "logoff",
    "group": "User",
    "description": "<p>Logoff current user</p> ",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/points",
    "title": "GET points[]",
    "version": "0.0.1",
    "name": "points",
    "group": "User",
    "description": "<p>Get all points of the current user.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "PointsDescription_ID",
            "description": "<p>Table: Users_PointsDescription/PointsDescription</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "PointsDescription_Name",
            "description": "<p>Table: PointsDescription</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>DoublePrecision</p> ",
            "optional": false,
            "field": "Points",
            "description": "<p>Table: PointsDescription</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Timestamp</p> ",
            "optional": false,
            "field": "Added",
            "description": "<p>Table: PointsDescription</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/points/amount",
    "title": "GET Total points",
    "version": "0.0.1",
    "name": "pointsAmount",
    "group": "User",
    "description": "<p>Get the total points of the current user.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>DoublePrecision</p> ",
            "optional": false,
            "field": "Points",
            "description": "<p>Table: PointsDescription</p> "
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/user/profile",
    "title": "GET profile",
    "version": "0.0.1",
    "name": "profile",
    "group": "User",
    "description": "<p>Get profile of the current user.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Users_ID",
            "description": "<p>Table: Users/Bobs</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Firstname",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Lastname",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Email",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Cellphone",
            "description": "<p>Table: Users</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "IsBob",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Bobs_ID",
            "description": "<p>Table: Users/Bob</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "BobsType_ID",
            "description": "<p>Table: Bob</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "BobsType_Name",
            "description": "<p>Table: BobsType</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "Autotype_ID",
            "description": "<p>Table: Autotype/Bob</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Autotype_Name",
            "description": "<p>Table: AutoType</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "LicensePlate",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "POST Register",
    "version": "0.0.1",
    "name": "register",
    "group": "User",
    "description": "<p>Register a new user</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Firstname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Lastname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "Cellphone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "FacebookID",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "IsBob",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "<p>DoublePrecision</p> ",
            "optional": true,
            "field": "PricePerKm",
            "description": "<p>Table: Bobs</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Integer</p> ",
            "optional": true,
            "field": "BobsType_ID",
            "description": "<p>Table: Bobs</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "LicensePlate",
            "description": "<p>Table: Bobs</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Integer</p> ",
            "optional": true,
            "field": "AutoType_ID",
            "description": "<p>Table: Bobs</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  success: true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  success: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user.js",
    "groupTitle": "User"
  }
] });