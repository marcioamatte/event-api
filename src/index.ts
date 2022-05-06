import './project/configurations/moduleAlias'
import { app } from '@/app/Server'

const PORT = 3000

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`))
