# AngularDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

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

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

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

## Dashboard Component Development Task

### User Story

**As a user**, I want to view an interactive dashboard that displays population data and geographic information for countries so that I can explore trends and analyze country-specific statistics visually.

### Requirements

- Angular 21 standalone components must be used for `DashboardComponent`, `MapComponent`, `ChartComponent`, and `InfoCardComponent`.
- Population data and country boundaries should be retrieved from services (`PopulationService`) asynchronously.
- The map must use `GraphicsLayer` for displaying country polygons and allow click interaction.
- Charting should be implemented using `ngx-echarts`.
- The application should handle dynamic updates gracefully using `ngOnChanges` or reactive streams.
- Unit tests should cover component creation, country selection, and data updates.

### Acceptance Criteria

- [ ] Dashboard loads without errors and shows a blank map initially.
- [ ] Selecting a country on the map updates the chart and info card with correct data.
- [ ] Chart displays correct population trend based on `PopulationRecord`.
- [ ] The info card shows the latest population and relevant country metadata.
- [ ] Components are tested with unit tests using Vitest or Angular testing utilities.
- [ ] No console errors or warnings appear during user interactions.

### Additional Notes

- Ensure **responsive design** for different screen sizes.
- Handle cases where population data or geojson boundaries are missing.
- Optimize performance for large datasets (e.g., 200+ countries).
- Include logging for debugging country selection and data fetching.
