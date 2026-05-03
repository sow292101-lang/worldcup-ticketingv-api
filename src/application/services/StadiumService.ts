import { Repository } from "typeorm"
import { Stadium } from "../../domain/entities/Stadium"
import { NotFoundError } from "domain/errors/NotFoundError"

export class StadiumService {
    private readonly stadiumRepository: Repository<Stadium>

    constructor(stadiumRepository: Repository<Stadium>) {
        this.stadiumRepository = stadiumRepository
    }

    async findAll(): Promise<Stadium[]> {
        return await this.stadiumRepository.find({
            relations: ["city", "city.country"]
        })
    }

    async findByName(name: string): Promise<Stadium> {
        const stadium = await this.stadiumRepository.findOne({
            where: { name },
            relations: ["city", "city.country"]
        })
        if (!stadium) {
            throw new NotFoundError(`Stadium "${name}" does not exist`)
        }
        return stadium
    }
}