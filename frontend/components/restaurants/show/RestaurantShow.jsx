import React, { Component } from 'react';
import VisualSummary from './VisualSummary';
import RestaurantShowFormContainer from './RestaurantShowForm/RestaurantShowFormContainer';
import RestaurantShowPhotos from './RestaurantShowPhotos';
import RestaurantReviewItem from './RestaurantShowReviewItem';
import { NavHashLink as NavLink } from 'react-router-hash-link';

class RestaurantShow extends Component {
  constructor(props) {
    super(props);

    this.handleSaveClick = this.handleSaveClick.bind(this)
  }

  sidebarDataArr(rest) {
    let details = {
      'Address': [rest.address, 'fas fa-map-marker-alt'],
      'Cross Street': [rest.crossStreet, 'fas fa-car-alt'],
      'Neighborhood': [rest.neighborhood, 'far fa-building'],
      'Hours': [rest.hours, 'far fa-clock'],
      'Cuisine': [rest.cuisine, 'fas fa-utensils'],
      'Dress Code': [rest.dressCode, 'fas fa-tshirt'],
      'Parking Details': [rest.parkingDetails, 'fas fa-parking'],
      'Payment Options': [rest.paymentOptions, 'fas fa-credit-card'],
      'Phone Number': [rest.phone, 'fas fa-phone'],
      'Website': [rest.website, 'far fa-share-square'],
    }

    return Object.entries(details);
  }

  handleSaveClick() {
    if (this.props.currentUserId === null) return this.props.history.push(`${this.props.history.location.pathname}/signin`);

    let savedRestaurant = {
      user_id: this.props.currentUserId,
      restaurant_id: this.props.restaurant.id
    }

    if (this.props.savedRestaurant) {
      this.props.unSaveRestaurant(this.props.savedRestaurant.id)
    } else {
      this.props.createSavedRestaurant(savedRestaurant)
    }
  }

  componentDidMount() {
    let payload = {
      user_id: this.props.currentUserId,
      restaurant_id: this.props.match.params.id
    }

    this.props.requestRestaurant(payload)
  }

  render() {
    if (!this.props.restaurant) return null;

    let { restaurant, users, reviews } = this.props;

    const sidebarDataArr = this.sidebarDataArr(restaurant);
    let tabArr = ['Overview', 'Photos', 'Reviews'];

    const mainTabs = tabArr.map((tab, i) => {
      return <li key={i}><NavLink smooth to={`/restaurants/${restaurant.id}#${tab}`}>{tab}</NavLink></li>
    })

    const sidebarDetails = sidebarDataArr.map((detail, i) => {
      if (detail[1]) {
        let label = detail[0];
        let val = detail[1][0] || 'N/A';
        let icon = detail[1][1];

        val = (label === 'Website' && val !== 'N/A') ? <a href={val}>{val}</a> : val
        return (
          <li key={i}>
            <i className={icon} />
            <div>
              <label>{label}</label>
              <p>{val}</p>
            </div>
          </li>
        )
      }
    })

    const reviewList = reviews.map(rev => {
      return <RestaurantReviewItem key={rev.id}
        review={rev}
        reviewer={users[rev.userId]} />
    })

    let saveButton = (this.props.savedRestaurant) ?
      <button className="save-restaurant-button saved-restaurant-button" onClick={this.handleSaveClick}>
        <i id="Overview" className='fa fa-bookmark' />Restaurant Saved!</button> :
      <button className="save-restaurant-button" onClick={this.handleSaveClick}>
        <i id="Overview" className='far fa-bookmark' />Save this Restaurant</button>


    return (
      <div className="restaurant-show-page">
        <header style={{ backgroundImage: `url(${restaurant.wallpaperURL})` }}>
          {saveButton}
        </header>
        <main>
          <section className="restaurant-show-main">
            <ul>
              {mainTabs}
            </ul>
            <div className="restaurant-show-main-content">
              <h1>{restaurant.name}</h1>
              <VisualSummary restaurant={restaurant} reviews={reviews} />
              <div className="restaurant-show-main-content-desc">{restaurant.description}</div>
              <div id="Photos" className="restaurant-photos">
                <h2>Photos</h2>
                <RestaurantShowPhotos restaurant={restaurant} />
              </div>
              <div id="Reviews" className="restaurant-reviews">
                <div className="review-header">
                  <h2>Reviews</h2>
                  <h3><i className='fas fa-plus' /> Make a review</h3>
                  <h3><i className='fas fa-edit' /> Edit your review</h3>
                  <h3><i className='fa fa-close' /> Delete your review</h3>
                </div>
                {reviewList}
              </div>
            </div>
          </section>
          <section className="restaurant-show-sidebar">
            <RestaurantShowFormContainer bookedTimesToday={restaurant.bookedTimesToday} restaurantId={restaurant.id} />
            <ul className="restaurant-details">
              {sidebarDetails}
            </ul>
          </section>
        </main>
      </div>
    );
  }
}

export default RestaurantShow;
