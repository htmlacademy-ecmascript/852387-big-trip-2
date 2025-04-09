//import SortView from './view/sort-view.js';
//import FilterView from './view/filter-view.js';
//import NewPointButtonView from './view/new-point-button-view.js';
//import { render } from './framework/render.js';
import BoardPointsPresenter from './presenter/board-points-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
//import { generateFilter } from './mock/filter.js';

const body = document.body;
const siteHeaderElement = body.querySelector('.page-header');
const tripMain = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const containerTripEvents = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.init();

const filterPresenter = new FilterPresenter({
  filterContainer: tripMain,
  filterModel,
  pointsModel
});

const boardPointsPresenter = new BoardPointsPresenter({
  container: containerTripEvents,
  pointsModel,
  filterModel,
});


filterPresenter.init();
boardPointsPresenter.init();
