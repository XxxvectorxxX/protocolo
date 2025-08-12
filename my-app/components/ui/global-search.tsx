"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("todos")

  const filters = [
    { value: "todos", label: "Todos" },
    { value: "contatos", label: "Contatos" },
    { value: "tickets", label: "Tickets" },
    { value: "tarefas", label: "Tarefas" },
    { value: "oportunidades", label: "Oportunidades" },
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // @ts-ignore
      window.showToast?.({
        type: "info",
        title: "Busca realizada",
        description: `Buscando por "${searchQuery}" em ${selectedFilter}`,
      })
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="flex items-center space-x-2 max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar em todo o sistema..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="pl-10 pr-10 focus:ring-2 focus:ring-[#06b6d4] focus:border-[#06b6d4] transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">{filters.find((f) => f.value === selectedFilter)?.label}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {filters.map((filter) => (
            <DropdownMenuItem
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={selectedFilter === filter.value ? "bg-accent" : ""}
            >
              {filter.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
