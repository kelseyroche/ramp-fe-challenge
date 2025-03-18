import { useCallback, useState, useEffect } from "react"
import { Employee } from "../utils/types"
import { useCustomFetch } from "./useCustomFetch"
import { EmployeeResult } from "./types"

export function useEmployees(): EmployeeResult {
  const { fetchWithCache, loading: employeesLoading } = useCustomFetch()
  const [employees, setEmployees] = useState<Employee[] | null>(null)

  const fetchAll = useCallback(async () => {
    const employeesData = await fetchWithCache<Employee[]>("employees")
    setEmployees(employeesData || [])
  }, [fetchWithCache])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const invalidateData = useCallback(() => {
    setEmployees(null)
  }, [])

  return { data: employees, loading: employeesLoading, fetchAll, invalidateData }
}
