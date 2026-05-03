import { Repository } from "typeorm"
import { City } from "../../domain/entities/City"
import { NotFoundError } from "domain/errors/NotFoundError"

export class CityService {
    private readonly cityRepository: Repository<City>

    constructor(cityRepository: Repository<City>) {
        this.cityRepository = cityRepository
    }

    async findAll(): Promise<City[]> {
        return await this.cityRepository.find({
            relations:["country"]
        })
    }

    async findByName(name: string): Promise<City> {
        const city = await this.cityRepository.findOne({
            where: { name },
            relations: ["country"]
        })
        if (!city) {
            throw new NotFoundError(`City "${name}" does not exist`)
        }
        return city
    }
}