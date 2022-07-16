import React, { FormEvent, useRef, useState } from 'react'

export enum EFilterTypes {
  EQUAL = 'EQUAL',
  EQUAL_NUMBER = 'EQUAL_NUMBER',
  CONTAINS = "CONTAINS",
  GREATER = "GREATER",
  LESS = "LESS"
}

const filterTypesMap = {
  [EFilterTypes.EQUAL]: {
    title: 'Равно',
    inputType: 'text'
  },
  [EFilterTypes.EQUAL_NUMBER]: {
    title: 'Равно',
    inputType: 'number'
  },
  [EFilterTypes.CONTAINS]: {
    title: 'Содержит',
    inputType: 'text'
  },
  [EFilterTypes.GREATER]: {
    title: 'Больше',
    inputType: 'number'
  },
  [EFilterTypes.LESS]: {
    title: 'Меньше',
    inputType: 'number'
  }
}

//todo абстрагировать типы
export type TFilterOption = {
  [key: string]: {
    header: string,
    filterTypes: EFilterTypes[]
  }
}

export type TOnFilterSubmitParams = {
  dataKey: string,
  filter: EFilterTypes,
  value: string | number
}

type TFilterProps = {
  filters: TFilterOption,
  onFilter: (params: TOnFilterSubmitParams) => void
}

const Filters: React.FC<TFilterProps> = ({ filters, onFilter }) => {
  const [selectedColumn, setSelectedColumn] = useState<string>('')
  const [selectedFilter, setSelectedFilter] = useState<EFilterTypes | ''>('')

  //todo попробовать объединить в один handler
  const columnSelectorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value)
    setSelectedFilter('')
  }

  const filterSelectorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value as EFilterTypes)
  }

  const filterInputRef = useRef<HTMLInputElement>(null)

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    const filterInputValue = filterInputRef.current?.value
    if (!filterInputValue || !selectedFilter) return

    onFilter({
      dataKey: selectedColumn,
      filter: selectedFilter,
      value: filterInputValue
    })
    clearFilters()
  }

  const clearFilters = () => {
    setSelectedColumn('')
    setSelectedFilter('')
    //todo очищать инпут
    // filterInputRef.current && filterInputRef.current.value = '';
  }

  const $columnOptions = Object.keys(filters).map(dataKey =>
    (<option key={dataKey} value={dataKey}>{filters[dataKey].header}</option>))

  const $filterOptions = filters[selectedColumn]?.filterTypes.map(filterType => {
    const { title } = filterTypesMap[filterType]
    return (<option key={`${selectedColumn}_${title}`} value={filterType}>{title}</option>)
  })

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div className="row">
        <div className="col">
          <select
            onChange={columnSelectorHandler}
            defaultValue={''}

            className="form-select"
            aria-label="Выберите столбец для фильтрации"
          >
            <option value={''}>Выберите столбец</option>
            {$columnOptions}
          </select>
        </div>

        <div className="col">
          <select
            onChange={filterSelectorHandler}
            defaultValue={''}
            className="form-select"
            disabled={!selectedColumn}
            aria-label="Выберите Фильтр"
          >
            <option value={''}>Выберите фильтр</option>
            {$filterOptions}
          </select>
        </div>

        <div className="col">
          <input
            className="form-control"
            type={selectedFilter ? filterTypesMap[selectedFilter].inputType : 'text'}
            disabled={!selectedFilter}
            ref={filterInputRef}
            required={true}
            placeholder="Введите фильтрующее значение"
            aria-label="Введите фильтрующее значение"
          />
        </div>

        <div className="btn-group col" role="group">
          <button type="submit" className="btn btn-primary">Применить фильтр</button>
          <button onClick={clearFilters} type="button" className="btn btn-warning">Сбросить</button>
        </div>
      </div>
    </form>
  )
}

export default Filters