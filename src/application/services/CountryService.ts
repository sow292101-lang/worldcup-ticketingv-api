import { Repository } from "typeorm"
import { Country } from "../../domain/entities/Country"
import { NotFoundError } from "domain/errors/NotFoundError"

export class CountryService {
    private readonly countryRepository: Repository<Country>

    constructor(countryRepository: Repository<Country>) {
        this.countryRepository = countryRepository
    }

    async findAll(): Promise<Country[]> {
        return await this.countryRepository.find()
    }

    async findByCode(code: string): Promise<Country> {
        const country = await this.countryRepository.findOneBy({ code: code.toLowerCase() })
        if (!country) {
            throw new NotFoundError(`Country "${code}" does not exist`)
        }
        return country
    }
}