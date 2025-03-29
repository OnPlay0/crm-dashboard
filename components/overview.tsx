import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, DollarSign, Briefcase, TrendingUp, TrendingDown } from "lucide-react"
import { Overview as OverviewChart } from "./overview-chart"
import { RecentSales } from "./recent-sales"

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500 inline" />
            +5.2% desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Activos</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500 inline" />
            +10.1% desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas Mensuales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$24,565</div>
          <p className="text-xs text-muted-foreground">
            <TrendingDown className="mr-1 h-4 w-4 text-red-500 inline" />
            -3.1% desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Servicios Activos</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">92</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500 inline" />
            +7.4% desde el mes pasado
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Resumen de Ventas</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <OverviewChart />
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle>Ventas Recientes</CardTitle>
          <CardDescription>Últimas 5 ventas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle>Distribución de Servicios</CardTitle>
          <CardDescription>Servicios por categoría</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Activos</TabsTrigger>
              <TabsTrigger value="inactive">Inactivos</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Consultoría</div>
                  <div className="text-xs text-muted-foreground">42 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[45%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Desarrollo</div>
                  <div className="text-xs text-muted-foreground">28 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[30%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Soporte</div>
                  <div className="text-xs text-muted-foreground">15 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[16%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Capacitación</div>
                  <div className="text-xs text-muted-foreground">7 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[8%]" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Consultoría</div>
                  <div className="text-xs text-muted-foreground">38 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[48%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Desarrollo</div>
                  <div className="text-xs text-muted-foreground">25 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[32%]" />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Consultoría</div>
                  <div className="text-xs text-muted-foreground">4 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[25%]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium">Desarrollo</div>
                  <div className="text-xs text-muted-foreground">3 servicios</div>
                  <div className="h-2 w-full bg-muted mt-1 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[19%]" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

