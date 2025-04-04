//import SortView from './view/sort-view.js';
import FilterView from './view/filter-view.js';
import { render } from './framework/render.js';
import BoardPointsPresenter from './presenter/board-points-presenter.js';
import PointsModel from './model/point-model.js';
import { generateFilter } from './mock/filter.js';

const body = document.body;
const siteHeaderElement = body.querySelector('.page-header');
const tripControlFilter = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const containerTripEvents = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
pointsModel.init();

const filters = generateFilter(pointsModel.points);

render(new FilterView({ filters }), tripControlFilter);

const boardPointsPresenter = new BoardPointsPresenter({
  container: containerTripEvents,
  pointsModel: pointsModel,
});

boardPointsPresenter.init();
