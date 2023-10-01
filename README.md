# Products Microservice

## Overview
This repository contains the products microservice for the Atelier e-commerce clothing website. It features API endpoints for the complete product list, individual product information, the styles associated with any given product, and the related products for any given product. An NGINX load balancer is used to manage requests across five independent server instances and is cabable of sustaining a rate of 1800 requests per second.

!("./service diagram.png")

## Table of Contents
- Description and Endpoints
- Getting Started
- Usage

## Description and Endpoints
This microservice provides all product information for the Atelier catalog. There are four inputs that allow the retrieval of product-related data.
- **/products**: By default, this endpoint will return a list containing the first five products in the Atelier catalog, in order of ID number. Optional `page` and `count` URL parameters can be including in the request to return a list specific range of products.
- **/products/:id**: Using this enpoint and including a products ID number will return detailed information about a single product, including the product name, slogan, description, category, and default price.
- **/products/:id/styles**: Using this enpoint with a specific product ID will return all styles and style information associated with that particular product, including the style ID, productd ID, name, style SKU, style photos, sale price, original price, and the default style.
- **/products/:id/related**: Using the endpoint with a specific product ID will return a list of all related products.

## Geting Started

