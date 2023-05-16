import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    BarData: {},
    pieChart: {},
    fullPie: {},
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination,
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }
      const getBarData = updatedData.last7DaysVaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const getVaccinationGender = updatedData.vaccinationByGender
      const getVaccinationAge = updatedData.vaccinationByAge
      this.setState({
        BarData: getBarData,
        pieChart: getVaccinationGender,
        fullPie: getVaccinationAge,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderVaccinationView = () => {
    const {BarData, pieChart, fullPie} = this.state
    return (
      <div className="vaccination-container">
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <VaccinationCoverage BarData={BarData} />
        <VaccinationByGender pieChart={pieChart} />
        <VaccinationByAge fullPie={fullPie} />
      </div>
    )
  }

  renderAllVaccinationDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderVaccinationView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="img"
          />
          <h1 className="head">Co-WIN</h1>
        </div>

        {this.renderAllVaccinationDetails()}
      </div>
    )
  }
}

export default CowinDashboard
