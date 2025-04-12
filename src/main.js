import PointsApiService from './points-api-service.js';
//import { RenderPosition } from './framework/render.js'; //==============
// import { generateRandomString } from './utils/common.js';
import BoardPointsPresenter from './presenter/board-points-presenter.js';
//import NewPointButtonView from './view/new-point-button-view.js'; ///===========
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import HeaderInfoPresenter from './presenter/header-info-presenter.js';


const AUTHORIZATION = 'Basic er883jdzbdwu8yt6v';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';


const tripMain = document.querySelector('.trip-main');
//const filtersContainer = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel({pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();
const infoPresenter = new HeaderInfoPresenter({
  pointsModel,
  container: tripMain });

const filterPresenter = new FilterPresenter({
  pointsModel,
  filterModel,
  filterContainer: tripMain
});

const boardPointsPresenter = new BoardPointsPresenter({
  container: pointsContainer,
  pointsModel,
  filterModel,
  newPointBtnContainer: tripMain,
  headerInfoPresenter: infoPresenter
});

////////////////////////////////////////////////////////////
// const newPointButtonComponent = new NewPointButtonView({ onClick: handleNewPointButtonClick });
//
// function handleNewPointFormClose() {
  // newPointButtonComponent.element.disabled = false;
// }
//
// function handleNewPointButtonClick() {
  // boardPointsPresenter.createPoint();
  // newPointButtonComponent.element.disabled = true;
// }


boardPointsPresenter.init();
pointsModel.init();
  // .finally(() => {
    // render(newPointButtonComponent, tripMain);
  // });
filterPresenter.init();

