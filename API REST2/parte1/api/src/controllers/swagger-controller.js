const config = require("../configs/env");

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "OAuth2 Movies API",
    version: "1.0.0",
    description: "API de Filmes desenvolvida pelo Grupo01 de Desenvolvimento Web II",
    contact: { name: "inf-21-dw2-g01" },
  },
  servers: [{ url: "http://localhost:" + config.port }],
  security: [
    {
      OAuth2Security: [],
    },
  ],
  paths: {
    "/Actors/Count": {
      get: {
        tags: ["ActorsController"],
        summary: "Count Actors",
        operationId: "countActors",
        responses: {
          200: {
            description: "Number of Actors model instances",
          },
        },
      },
    },
    "/Actors": {
      get: {
        tags: ["ActorsController"],
        summary: "Retrieve Actors",
        operationId: "retrieveActors",
        responses: {
          200: {
            description: "Array of Actors model instances",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Actor",
                  },
                  "x-content-type": "application/json",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/inline_response_200",
                },
              },
            },
          },
        },
        "x-swagger-router-controller": "ActorsController",
      },
      post: {
        tags: ["ActorsController"],
        summary: "Create Actor",
        operationId: "createActor",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Actor",
              },
              examples: {
                ActorInsert: {
                  $ref: "#/components/examples/ActorInsert",
                },
                ActorExample01: {
                  $ref: "#/components/examples/ActorExample01",
                },
                ActorExample02: {
                  $ref: "#/components/examples/ActorExample02",
                },
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Actor",
              },
              examples: {
                ActorExample01: {
                  $ref: "#/components/examples/ActorExample01",
                },
                ActorExample02: {
                  $ref: "#/components/examples/ActorExample02",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Create a Actor model instance",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Actor",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Actor",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
        "x-swagger-router-controller": "ActorsController",
      },
    },
    "/Actor/{id}": {
      get: {
        tags: ["ActorsController"],
        summary: "Retrieve Actor",
        operationId: "retrieveActor",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Retrieve Actor id 1",
                value: 1,
              },
              two: {
                summary: "Retrieve Actor id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Actor",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Actor",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "ActorsController",
      },
      put: {
        tags: ["ActorsController"],
        summary: "Update Actor",
        operationId: "updateActor",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Update Actor id 1",
                value: 1,
              },
              two: {
                summary: "Update Actor id 2",
                value: 2,
              },
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Actor",
              },
              examples: {
                ActorUpdate: {
                  $ref: "#/components/examples/ActorInsert",
                },
                ActorExample01: {
                  $ref: "#/components/examples/ActorExample01",
                },
                ActorExample02: {
                  $ref: "#/components/examples/ActorExample02",
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  description: "Actor PUT success",
                  "x-content-type": "application/json",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "ActorsController",
      },
      delete: {
        tags: ["ActorsController"],
        summary: "Delete Actor",
        operationId: "deleteActor",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Delete Actor id 1",
                value: 1,
              },
              two: {
                summary: "Delete Actor id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          204: {
            description: "No Content",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "ActorsController",
      },
    },
    "/Directors/Count": {
      get: {
        tags: ["DirectorsController"],
        summary: "Count Directors",
        operationId: "countDirectors",
        responses: {
          200: {
            description: "Number of Directors model instances",
          },
        },
      },
    },
    "/Directors": {
      get: {
        tags: ["DirectorsController"],
        summary: "Retrieve Directors",
        operationId: "retrieveDirectors",
        responses: {
          200: {
            description: "Array of Director model instances",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Director",
                  },
                  "x-content-type": "application/json",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/inline_response_200_1",
                },
              },
            },
          },
        },
        "x-swagger-router-controller": "DirectorsController",
      },
      post: {
        tags: ["DirectorsController"],
        summary: "Create Director",
        operationId: "createDirector",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Director",
              },
              examples: {
                DirectorInsert: {
                  $ref: "#/components/examples/DirectorInsert",
                },
                DirectorExample01: {
                  $ref: "#/components/examples/DirectorExample01",
                },
                DirectorExample02: {
                  $ref: "#/components/examples/DirectorExample02",
                },
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Director",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Create a Director model instance",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Director",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Director",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
        "x-swagger-router-controller": "DirectorsController",
      },
    },
    "/Director/{id}": {
      get: {
        tags: ["DirectorsController"],
        summary: "Retrieve Director",
        operationId: "retrieveDirector",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Retrieve Director id 1",
                value: 1,
              },
              two: {
                summary: "Retrieve Director id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Director",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Director",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "DirectorsController",
      },
      put: {
        tags: ["DirectorsController"],
        summary: "Update Director",
        operationId: "updateDirector",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Update Director id 1",
                value: 1,
              },
              two: {
                summary: "Update Director id 2",
                value: 2,
              },
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Director",
              },
              examples: {
                DirectorUpdate: {
                  $ref: "#/components/examples/DirectorInsert",
                },
                DirectorExample01: {
                  $ref: "#/components/examples/DirectorExample01",
                },
                DirectorExample02: {
                  $ref: "#/components/examples/DirectorExample02",
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  description: "Director PUT success",
                  "x-content-type": "application/json",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "DirectorsController",
      },
      delete: {
        tags: ["DirectorsController"],
        summary: "Delete Director",
        operationId: "deleteDirector",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Delete Director id 1",
                value: 1,
              },
              two: {
                summary: "Delete Director id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          204: {
            description: "No Content",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "DirectorsController",
      },
    },
    "/Genres/Count": {
      get: {
        tags: ["GenresController"],
        summary: "Count Genres",
        operationId: "countGenres",
        responses: {
          200: {
            description: "Number of Genres model instances",
          },
        },
      },
    },
    "/Genres": {
      get: {
        tags: ["GenresController"],
        summary: "Retrieve Genres",
        operationId: "retrieveGenres",
        responses: {
          200: {
            description: "Array of Genres model instances",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Genre",
                  },
                  "x-content-type": "application/json",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/inline_response_200",
                },
              },
            },
          },
        },
        "x-swagger-router-controller": "GenresController",
      },
      post: {
        tags: ["GenresController"],
        summary: "Create Genre",
        operationId: "createGenre",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Genre",
              },
              examples: {
                GenreInsert: {
                  $ref: "#/components/examples/GenreInsert",
                },
                GenreExample01: {
                  $ref: "#/components/examples/GenreExample01",
                },
                GenreExample02: {
                  $ref: "#/components/examples/GenreExample02",
                },
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Genre",
              },
              examples: {
                GenreInsert: {
                  $ref: "#/components/examples/GenreInsert",
                },
                ActorExample01: {
                  $ref: "#/components/examples/GenreExample01",
                },
                ActorExample02: {
                  $ref: "#/components/examples/GenreExample02",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Create a Genre model instance",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Genre",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Genre",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
        "x-swagger-router-controller": "GenresController",
      },
    },
    "/Genre/{id}": {
      get: {
        tags: ["GenresController"],
        summary: "Retrieve Genre",
        operationId: "retrieveGenre",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Retrieve Genre id 1",
                value: 1,
              },
              two: {
                summary: "Retrieve Genre id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Genre",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Genre",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "GenresController",
      },
      put: {
        tags: ["GenresController"],
        summary: "Update Genre",
        operationId: "updateGenre",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Update Genre id 1",
                value: 1,
              },
              two: {
                summary: "Update Genre id 2",
                value: 2,
              },
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Genre",
              },
              examples: {
                GenreUpdate: {
                  $ref: "#/components/examples/GenreInsert",
                },
                GenreExample01: {
                  $ref: "#/components/examples/GenreExample01",
                },
                GenreExample02: {
                  $ref: "#/components/examples/GenreExample02",
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  description: "Genre PUT success",
                  "x-content-type": "application/json",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "GenresController",
      },
      delete: {
        tags: ["GenresController"],
        summary: "Delete Genre",
        operationId: "deleteGenre",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Delete Genre id 1",
                value: 1,
              },
              two: {
                summary: "Delete Genre id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          204: {
            description: "No Content",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "GenresController",
      },
    },
    "/Movies/Count": {
      get: {
        tags: ["MoviesController"],
        summary: "Count Movies",
        operationId: "countMovies",
        responses: {
          200: {
            description: "Number of Movies model instances",
          },
        },
      },
    },
    "/Movies": {
      get: {
        tags: ["MoviesController"],
        summary: "Retrieve Movies",
        operationId: "retrieveMovies",
        responses: {
          200: {
            description: "Array of Movies model instances",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Movie",
                  },
                  "x-content-type": "application/json",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/inline_response_200",
                },
              },
            },
          },
        },
        "x-swagger-router-controller": "MoviesController",
      },
      post: {
        tags: ["MoviesController"],
        summary: "Create Movie",
        operationId: "createMovie",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Movie",
              },
              examples: {
                MovieInsert: {
                  $ref: "#/components/examples/MovieInsert",
                },
                MovieExample01: {
                  $ref: "#/components/examples/MovieExample01",
                },
                MovieExample02: {
                  $ref: "#/components/examples/MovieExample02",
                },
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Movie",
              },
              examples: {
                MovieInsert: {
                  $ref: "#/components/examples/MovieInsert",
                },
                MovieExample01: {
                  $ref: "#/components/examples/MovieExample01",
                },
                MovieExample02: {
                  $ref: "#/components/examples/MovieExample02",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Create a Movie model instance",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Movie",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Movie",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
        "x-swagger-router-controller": "MoviesController",
      },
    },
    "/Movie/{id}": {
      get: {
        tags: ["MoviesController"],
        summary: "Retrieve Movie",
        operationId: "retrieveMovie",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Retrieve Movie id 1",
                value: 1,
              },
              two: {
                summary: "Retrieve Movie id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Movie",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Movie",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "MoviesController",
      },
      put: {
        tags: ["MoviesController"],
        summary: "Update Movie",
        operationId: "updateMovie",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Update Movie id 1",
                value: 1,
              },
              two: {
                summary: "Update Movie id 2",
                value: 2,
              },
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Movie",
              },
              examples: {
                MovieUpdate: {
                  $ref: "#/components/examples/MovieInsert",
                },
                MovieExample01: {
                  $ref: "#/components/examples/MovieExample01",
                },
                MovieExample02: {
                  $ref: "#/components/examples/MovieExample02",
                },
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  description: "Movie PUT success",
                  "x-content-type": "application/json",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "MoviesController",
      },
      delete: {
        tags: ["MoviesController"],
        summary: "Delete Movie",
        operationId: "deleteMovie",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Delete Movie id 1",
                value: 1,
              },
              two: {
                summary: "Delete Movie id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          204: {
            description: "No Content",
          },
          404: {
            description: "id not found",
          },
        },
        "x-swagger-router-controller": "MoviesController",
      },
    },
    "/Genre/{id}/Movies": {
      get: {
        tags: ["GenreByMoviesController"],
        summary: "Retrieve Genre based on Movies ID",
        operationId: "retrieveGenreOnMovies",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Retrieve Movie id 1",
                value: 1,
              },
              two: {
                summary: "Retrieve Movie id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Array of Genre model instances by movie",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Genre",
                  },
                  "x-content-type": "application/json",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/inline_response_200",
                },
              },
            },
          },
        },
        "x-swagger-router-controller": "GenreByMoviesController",
      },
    },
    "/Movies/{id}/Genre": {
      get: {
        tags: ["MoviesByGenreController"],
        summary: "Retrieve Movies based on Genre ID",
        operationId: "retrieveMoviesOnGenre",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            style: "simple",
            explode: false,
            schema: {
              minimum: 1,
              type: "integer",
              format: "int64",
            },
            examples: {
              one: {
                summary: "Retrieve Movie id 1",
                value: 1,
              },
              two: {
                summary: "Retrieve Movie id 2",
                value: 2,
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Array of Genre model instances by movie",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Genre",
                  },
                  "x-content-type": "application/json",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/inline_response_200",
                },
              },
            },
          },
        },
        "x-swagger-router-controller": "MoviesByGenreController",
      },
    },
  },
  components: {
    schemas: {
      Director: {
        title: "Director",
        required: [
          "name",
        ],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: "string",
          },
        },
        additionalProperties: true,
        example: {
          id: 0,
          name: "name",
        },
      },
      Actor: {
        title: "Actor",
        required: ["name"],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: "string",
          },
        },
        additionalProperties: false,
        example: {
          id: 0,
          name: "name",
        },
      },
      Genre: {
        title: "Genre",
        required: ["genre"],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: "string",
          },
        },
        additionalProperties: false,
        example: {
          id: 0,
          name: "name",
        },
      },
      Movie: {
        title: "Movie",
        required: ["language", "original_title", "release_date", "runtime", "actor_id", "director_id"],
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          language: {
            type: "string",
          },
          original_title: {
            type: "string",
          },
          release_date: {
            type: "string",
            format: "date",
          },
          runtime: {
            type: "integer",
            format: "int64",
          },
          actor_id: {
            type: "integer",
            format: "int64",
          },
          director_id: {
            type: "integer",
            format: "int64",
          },
        },
        additionalProperties: false,
        example: {
          id: 0,
          name: "name",
          language: "language",
          original_title: "original_title",
          release_date: "2021-01-02",
          runtime: 123,
          actor_id: 0,
          director_id: 0
        },
      },
      inline_response_200: {
        type: "object",
        properties: {
          Actor: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Actor",
            },
          },
        },
        xml: {
          name: "Actor",
        },
      },
      inline_response_200_1: {
        type: "object",
        properties: {
          Director: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Director",
            },
          },
        },
        xml: {
          name: "Director",
        },
      },
    },
    examples: {
      DirectorExample01: {
        value: {
          id: 1,
          name: "Director 01",
        },
      },
      DirectorExample02: {
        value: {
          id: 2,
          name: "Director 02",
        },
      },
      DirectorInsert: {
        value: {
          name: "Director",
        },
      },
      ActorExample01: {
        value: {
          id: 1,
          name: "Actor 01",
        },
      },
      ActorExample02: {
        value: {
          id: 2,
          name: "Actor 02",
        },
      },
      ActorInsert: {
        value: {
          name: "Actor",
        },
      },
      GenreExample01: {
        value: {
          id: 1,
          genre: "Genre 01",
        },
      },
      GenreExample02: {
        value: {
          id: 2,
          genre: "Genre 02",
        },
      },
      GenreInsert: {
        value: {
          genre: "Genre",
        },
      },
      MovieExample01: {
        value: {
          id: 1,
          language: "",
          original_title: "",
          release_date: "2021-01-01",
          runtime: 0,
          actor_id: 1,
          director_id: 1
        },
      },
      MovieExample02: {
        value: {
          id: 2,
          language: "",
          original_title: "",
          release_date: "2021-01-01",
          runtime: 0,
          actor_id: 2,
          director_id: 2
        },
      },
      MovieInsert: {
        value: {
          language: "",
          original_title: "",
          release_date: "2021-01-01",
          runtime: 0,
          actor_id: 1,
          director_id: 2
        },
      },
    },
    securitySchemes: {
      OAuth2Security: {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl: "https://github.com/login/oauth/authorize",
            tokenUrl: "https://github.com/login/oauth/access_token",
            scopes: [],
          },
        },
      },
    },
  },
  security: [{ OAuth2Security: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./docs/**/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
