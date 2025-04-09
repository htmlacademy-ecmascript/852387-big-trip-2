//import SortView from './view/sort-view.js';
import FilterView from './view/filter-view.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';
import BoardPointsPresenter from './presenter/board-points-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
//import { generateFilter } from './mock/filter.js';

const filters = [
  {
    type: 'all',
    count: 0,
  },
];

const body = document.body;
const siteHeaderElement = body.querySelector('.page-header');
const tripMain = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const containerTripEvents = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.init();

//const filters = generateFilter(pointsModel.points);

//render(new FilterView({ filters }), tripControlFilter);
render(new FilterView({
  filters,
  currentFilterType: 'all',
  onFilterTypeChange: () => {}
}), tripMain);

//render(new NewPointButtonView(), tripMain);

const boardPointsPresenter = new BoardPointsPresenter({
  container: containerTripEvents,
  pointsModel,
});

boardPointsPresenter.init();
