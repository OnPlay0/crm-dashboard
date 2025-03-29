"use client";


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search } from "@/components/dashboard/search"
import { MainNav } from "@/components/dashboard/main-nav"
import { PlusCircle } from "lucide-react"


export default function UsersPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
            <div className="flex items-center space-x-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Filtrar usuarios..." className="max-w-sm" />
              <Button variant="outline">Filtrar</Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>US-001</TableCell>
                    <TableCell>Juan Pérez</TableCell>
                    <TableCell>juan.perez@ejemplo.com</TableCell>
                    <TableCell>Administrador</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>US-002</TableCell>
                    <TableCell>María Rodríguez</TableCell>
                    <TableCell>maria.rodriguez@ejemplo.com</TableCell>
                    <TableCell>Ventas</TableCell>
                    <TableCell>Comercial</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>US-003</TableCell>
                    <TableCell>Carlos Martínez</TableCell>
                    <TableCell>carlos.martinez@ejemplo.com</TableCell>
                    <TableCell>Soporte</TableCell>
                    <TableCell>Atención al Cliente</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>US-004</TableCell>
                    <TableCell>Laura García</TableCell>
                    <TableCell>laura.garcia@ejemplo.com</TableCell>
                    <TableCell>Marketing</TableCell>
                    <TableCell>Marketing</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        Inactivo
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>US-005</TableCell>
                    <TableCell>José López</TableCell>
                    <TableCell>jose.lopez@ejemplo.com</TableCell>
                    <TableCell>Finanzas</TableCell>
                    <TableCell>Contabilidad</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

