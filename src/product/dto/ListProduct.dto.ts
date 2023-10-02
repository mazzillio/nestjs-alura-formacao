class ListCharacteristicsProductDTO {
  name: string;
  description: string;
}

class ListImageProductDTO {
  url: string;
  description: string;
}

export class ListaProdutoDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly characteristics: ListCharacteristicsProductDTO[],
    readonly images: ListImageProductDTO[],
  ) {}
}
