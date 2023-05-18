import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {BarData} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <>
      <h1 className="head">Vaccination Coverage</h1>
      <BarChart width={1000} height={300} data={BarData} margin={{top: 5}}>
        <XAxis dataKey="vaccine_date" tick={{stroke: 'gray', strokeWidth: 1}} />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{stroke: 'gray', strokeWidth: 0}}
        />
        <Legend wrappedStyle={{padding: 30}} />
        <Bar dataKey="dose1" name="Dose1" fill="#2d87bb" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill=" #f54394" barSize="20%" />
      </BarChart>
    </>
  )
}

export default VaccinationCoverage
