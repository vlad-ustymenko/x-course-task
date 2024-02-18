import { useState } from 'react'
//redux
import {
  selectPriceFilter,
  selectLevelFilter,
  setPriceFilter,
  setLevelFilter,
} from '../redux/slices/filterSlice'
import { useDispatch, useSelector } from 'react-redux'
//component
import Select from 'react-select'

const ReactSelect = ({ price }) => {
  //Price select options
  const [priceValue, setPriceValue] = useState(useSelector(selectPriceFilter))

  const dispatch = useDispatch()

  const priceOptions = [
    { value: 'Any Price', label: 'Any Price' },
    {
      value: 'up to $15',
      label: 'up to $15',
    },
    { value: '$15-$30', label: '$15-$30' },
    { value: '$30+', label: '$30+' },
  ]

  const getPriceValue = () => {
    return priceValue && priceOptions.find((i) => i.value === priceValue)
  }

  const changePriceValue = (newValue) => {
    dispatch(setPriceFilter(newValue.value))
    setPriceValue(newValue.value)
  }

  //Level select options
  const [levelValue, setLevelValue] = useState(useSelector(selectLevelFilter))

  const levelOptions = [
    { value: 'Any Level', label: 'Any Level' },
    {
      value: 'Beginner',
      label: 'Beginner',
    },
    { value: 'Middle', label: 'Middle' },
    { value: 'Pro', label: 'Pro' },
  ]

  const getLevelValue = () => {
    return levelValue && levelOptions.find((i) => i.value === levelValue)
  }

  const changeLevelValue = (newValue) => {
    dispatch(setLevelFilter(newValue.value))
    setLevelValue(newValue.value)
  }
  return price === 'price' ? (
    <Select
      classNamePrefix="custom-select"
      onChange={changePriceValue}
      value={getPriceValue()}
      options={priceOptions}
    />
  ) : (
    <Select
      classNamePrefix="custom-select"
      onChange={changeLevelValue}
      value={getLevelValue()}
      options={levelOptions}
    />
  )
}

export default ReactSelect
