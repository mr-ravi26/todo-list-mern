export const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "description": "Todo Applist assessment",
        "version": "1.0.0",
        "title": "Todo App",
        "termsOfService": "http://ravi.ind.in",
        "contact": {
            "email": "mr.ravi26@gmail.com"
        }
    },
    "host": "http://ec2-3-21-102-190.us-east-2.compute.amazonaws.com/",
    "basePath": "/api",
    "tags": [
        {
            "name": "Express API",
            "description": "Everything Express",
            "externalDocs": {
                "description": "Find out more",
                "url": "http://ravi.ind.in"
            }
        }
    ],
    "schemes": [
        "http"
    ],
    "paths": {
        "/signin": {
            "post": {
                "tags": [
                    "user"
                ],
                "summary": "Logs user into the system",
                "description": "",
                "operationId": "loginUser",
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "email",
                        "in": "body",
                        "description": "The user email for login",
                        "required": true,
                        "type": "object"
                    },
                    {
                        "name": "password",
                        "in": "body",
                        "description": "The password for login in clear text",
                        "required": true,
                        "type": "object"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "400": {
                        "description": "Invalid username/password supplied"
                    },
                    "422": {
                        "description": "Entity is not processible, error at server"
                    }
                }
            }
        }
    }
}