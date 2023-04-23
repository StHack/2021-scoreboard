import React, { useEffect, useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react'
import { dateToString } from '../../services/date'

const useStyles = createStyles(theme => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}))

export interface HeadData {
  key: string
  label: string
  sortable: boolean
}

type CellData = string | number | Date | React.ReactNode
export type RowData = Record<string, CellData>

type SortOptions = {
  sortBy: string
  reversed: boolean
}

interface TableSortProps {
  headers: HeadData[]
  data: RowData[]
  filterable?: boolean
  sortOptions?: SortOptions
}

interface ThProps {
  children: React.ReactNode
  reversed: boolean
  sorted: boolean
  sortable: boolean

  onSort(): void
}

interface ThSortableWrapperProps {
  children: React.ReactNode
  sortable: boolean

  onSort(): void
}

const ThSortableWrapper = ({
  sortable,
  onSort,
  children,
}: ThSortableWrapperProps) => {
  const { classes } = useStyles()
  if (!sortable) return <>{children}</>
  return (
    <UnstyledButton onClick={onSort} className={classes.control}>
      {children}
    </UnstyledButton>
  )
}

const Th = ({ children, reversed, sorted, onSort, sortable }: ThProps) => {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <ThSortableWrapper onSort={onSort} sortable={sortable}>
        <Group position="apart" noWrap={true}>
          <Text fw={500} fz="sm">
            {children}
          </Text>
          {sortable && (
            <Center className={classes.icon}>
              <Icon size="0.9rem" stroke={1.5} />
            </Center>
          )}
        </Group>
      </ThSortableWrapper>
    </th>
  )
}

interface TrProps {
  headers: HeadData[]
  data: RowData
}

const Tr = ({ headers, data }: TrProps) => {
  const cells = headers.map(head => (
    <td key={head.key}>{transFormDataToDisplay(data[head.key])}</td>
  ))
  return <tr>{cells}</tr>
}

const filterData = (data: RowData[], search: string): RowData[] => {
  const query = search.toLowerCase().trim()
  return data.filter(item =>
    keys(data[0]).some(key => {
      if (!item[key]) {
        return false
      }
      switch (typeof item[key]) {
        case 'string':
        case 'number':
          return transFormDataToString(item[key]).toLowerCase().includes(query)
        default:
          return false
      }
    }),
  )
}

const transFormDataToString = (value: CellData): string => {
  switch (typeof value) {
    case 'string':
      return value
    case 'number':
      return (value as number).toString()
  }
  return ''
}
const transFormDataToDisplay = (value: CellData): string | React.ReactNode => {
  if (value instanceof Date) {
    return dateToString(value)
  }
  switch (typeof value) {
    case 'string':
      return value
    case 'number':
      return (value as number).toString()
    case 'object':
      if (React.isValidElement(value)) {
        return value
      }
      break
  }
  return ''
}

const sortData = (
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string },
): RowData[] => {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      const isNumberValues =
        typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number'
      const isDateValues =
        a[sortBy] instanceof Date && b[sortBy] instanceof Date

      if (payload.reversed) {
        if (isNumberValues) {
          return (b[sortBy] as number) - (a[sortBy] as number)
        }
        if (isDateValues) {
          return (b[sortBy] as Date)?.getTime() - (a[sortBy] as Date)?.getTime()
        }
        return transFormDataToString(b[sortBy]).localeCompare(
          transFormDataToString(a[sortBy]),
        )
      }

      if (isNumberValues) {
        return (a[sortBy] as number) - (b[sortBy] as number)
      }
      if (isDateValues) {
        return (a[sortBy] as Date)?.getTime() - (b[sortBy] as Date)?.getTime()
      }
      return transFormDataToString(a[sortBy]).localeCompare(
        transFormDataToString(b[sortBy]),
      )
    }),
    payload.search,
  )
}

export const TableSort = ({
  headers,
  data,
  filterable = true,
  sortOptions,
}: TableSortProps) => {
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  useEffect(() => {
    setSortedData(data)
  }, [data])

  useEffect(() => {
    if (sortOptions) {
      setSorting(sortOptions.sortBy, sortOptions.reversed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOptions])

  const setSorting = (field: keyof RowData, forcedReversed?: boolean) => {
    const reversed =
      forcedReversed ?? field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value }),
    )
  }

  const heads = headers.map(head => (
    <Th
      key={head.key}
      reversed={reverseSortDirection}
      sorted={sortBy === head.key}
      onSort={() => setSorting(head.key)}
      sortable={head.sortable}
    >
      {head.label}
    </Th>
  ))

  const rows = sortedData.map((row, index) => (
    <Tr key={index} data={row} headers={headers} />
  ))

  return (
    <>
      {filterable && (
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
      )}
      <ScrollArea offsetScrollbars type="always">
        <Table horizontalSpacing="md" verticalSpacing="xs">
          <thead>
            <tr>{heads}</tr>
          </thead>
          <tbody>
            {rows.length > 0
              ? (
                  rows
                )
              : (
              <tr>
                <td colSpan={Object.keys(headers).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
                )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  )
}
