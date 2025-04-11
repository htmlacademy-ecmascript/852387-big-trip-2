import { render } from './framework/render.js';
// import { generateRandomString } from './utils/common.js';
import BoardPointsPresenter from './presenter/board-points-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic er883jdzbdwu8yt6vg';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const body = document.body;
const siteHeaderElement = body.querySelector('.page-header');
const tripMain = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const containerTripEvents = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});
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
  onNewPointDestroy: handleNewPointFormClose
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPointsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}


filterPresenter.init();
boardPointsPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, tripMain);
  });

