# supermarket-api

### A REST API server to make groceries orders to a supermarket

This REST service pulls products from the public api of **[Kroger Developers](https://developer.kroger.com/)**, set an initial stock value of 10 and then save these products in a Mongo DB. Periodically at (00:00 AM) checks if there are new products (new brands), and start an update of the DB. To keep the functionality simple, there are 4 main types of products (Milk, Water, Cheese, and Meat) and only 5 products per each type are taken.

## Requirements

-   [Docker](https://www.docker.com/products/docker-desktop)

## Run the project

1. Open a terminal, go to the root source of the project and run `docker-compose build`

2. After that, run `docker-compose up` to start the service.

3. Once it finished, open the browser and navigate to [http://localhost:8010](http://localhost:8010). It should open a web page saying _Access Denied_ indicating that everything went well.

## Endpoints

### GET Get Product Types

http://localhost:8010/api/types

### GET Get Products

http://localhost:8010/api/products?type={productType}

#### Query Params

-   type (optional)

### PATCH Update Stock

http://localhost:8010/api/products

<code>
{
"productId": {Product Mongo Id},
"sizeId": {Size Mongo Id},
"quantity": {quantity}
}
</code>

<br>

Body Params

-   productId (required) - Must be a valid Mongo Id
-   sizeId (required) - Must be a valid Mongo Id
-   quantity (required) - Must be number greater than zero.

You cannot update the stock if the quantity goes over the current available stock

## Tests

You can run tests with the command `docker-compose run --rm app sh -c "npm test"`

## ER Diagram

This is the ER model of DB

![supermarket](https://user-images.githubusercontent.com/29830077/197031789-3eddba2c-d51b-418e-b13a-fcf86f11bb5c.png)

## Summary

-   I could have used a relational DB because Mongo was not designed to make relations between entities like I did, but I chose this approach because is easy and fast for creating a simple model.

-   Another thing is that I would change the UpdateDb class implementation because right now as it is, it's not easy to write tests that cover all the possible scenarios.

-   I would add an endpoint to restock the products whenever it needs.

-   Something I would like to highlight is that I implemented the service using Docker, so there's no need to worry about the OS or the needed libraries to make the service works.

-   Keep in mind that is not good practice to upload the .env file to the repository, but I did it to facilitate the tests on the REST service.
