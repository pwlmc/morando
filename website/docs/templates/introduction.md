---
sidebar_position: 1
---

# Introduction to Templates (WIP)

How you choose layers for your project may be more important than you think, and sometimes, more difficult also. They are truly an expression of how Single Page App, Mobile, Hybrid, Server-Side projects can differ from each other. The true art lies in finding the right split of layers, as expressed through classifiers.

In general, the practice shows that we will usually have to deal with the following types of layers in our JavaScript applications:
* Core layers
* Business layers
* Presentational layers

That said, those types of layers are not the layers themselves, or not always at least.

Let’s take a step back. The practice shows that these days, we usually build our products with a multi-tier architecture. For example:
* There might be a Node.js server that saves data to the Postgres DB and interacts with the outside world via a REST API.
* The REST API is consumed (among others) by the Front-End application that is written in React

When we zoom into those applications, we will notice that the Node.js back-end presentation layer is relatively thin. At the same time, the majority of the codebase resides in the business and core layers. On the contrary, in the React single-page application, the business and core layers are mostly a presentational layer, and the business logic is scattered across components. 

If we wanted to come up with a single, universal list of layers for both back-end and front-end applications based on our example, we would end up with a layer split that is suboptimal and possibly confusing. 

Morando comes with a set of predefined templates for the different project types. Templates are designed not only to speed up project setup, but also to do more. Each of them includes a recommended list of layers for the particular application type; you can think of them as:

“Config template is a recommended Morando architecture for the given project type”.

For example, the React SPA template is, in fact, the way we believe Morando layers should be implemented in the React Single Page Applications.

Of course, one size rarely fits all, so you are welcome to extend the template and overwrite the layers definition. That said, we expect the default way to use the Morando framework is to pick one template and stick to it.

