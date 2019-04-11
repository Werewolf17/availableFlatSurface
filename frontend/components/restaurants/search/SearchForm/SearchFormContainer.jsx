import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import { requestSearchedRestaurants, requestAllRestaurants } from '../../../../actions/restaurantActions';
import { flipSearchCalendar } from '../../../../actions/uiActions';
import { receiveReservationFormChange } from '../../../../actions/reservationActions';

const mSP = ({ ui }) => ({
  searchCalendar: ui.searchCalendar,
  reservationForm: ui.reservationForm
})

const mDP = dispatch => ({
  requestSearchedRestaurants: restaurants => dispatch(requestSearchedRestaurants(restaurants)),
  flipSearchCalendar: bool => dispatch(flipSearchCalendar(bool)),
  reservationFormChange: reservationData => dispatch(receiveReservationFormChange(reservationData))
});

const SearchFormContainer = connect(mSP, mDP)(SearchForm);

export default SearchFormContainer;