import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {pieChart} = props
  return (
    <>
      <h1 className="head">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="70%"
          cy="40%"
          data={pieChart}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </>
  )
}

export default VaccinationByGender
