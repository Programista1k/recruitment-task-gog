# Info about setup

So basically, this project is not set-up perfectly for production-use, it lacks proper tsconfig, eslint, prettier, husky, etc. - which would be essential in production use.

Also we don't have any API, we don't know about size of app, so there is not any NgRx or custom Signal-Store, because its like shooting a fly with a cannon in my opinion.

Lighthouse is not perfect because i assume we would have some nice CDN with images, which i could just build proper URL's for ngSrcSet.

Regarding tests, it's not 100% coverage, because of time. But it's not a problem for me really to have 100% test coverage, even E2E (i have some experience with complex scraping  using E2E tools like Playwright),
for this specific case, i just asked ChatGPT what tests should i make here, what coverage should be done, and double-checked if it is relevant for this case.

Basically, im not a big fan of using tools like a copilot, cursor, etc. because i think that they are too much suggestive for programmers, and those tools are making us
use less and less of our brain-power, but for things like testing, algorithms, or suggestions about test coverage/accesibility/performance/bugs its great, and ofc. for research (but sometimes its better to look for something myself.).


Project is made will full RWD. - from 320px up. (REGARDING IMAGES - I dont have those in higher quality, so it's hard for me to upscale for smaller devices so those are very very blurry.)

ALSO - If it's very common to use uncommon values (XD) for paddings, font-sizes, etc. i would just specify all of those into styles.css and override defualt tailwind config, so our
text-base would be 15px like with "GAME OF THE WEEK" instead of default 16px.

And also things like custom shadows, etc. we should declare those within tailwind as utility classes and our own "design-system".

Btw. i dont know if this figma is something intentionally prepared like that, but its so messy, paddings are not equal, etc.

And also the scale of the site is weird, the figma width is 1280, when the most common content-width that i use is 1350-1500px (depends).


# GogTask

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
