import { HttpStatus, Injectable } from "@nestjs/common";

const EasyYandexS3 = require("easy-yandex-s3");

@Injectable()
export class AwsService {

  async uploadFile(file: Express.Multer.File, alt: string, folder: string): Promise<any> {
    const altUnicode = decodeURI(alt).toLowerCase();
    const folderUnicode = decodeURI(folder).toLowerCase();
    const s3 = new EasyYandexS3({
      auth: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
        secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY
      },
      Bucket: process.env.YANDEX_BUCKET,
      debug: false
    });

    const data = await s3.Upload({
      buffer: file.buffer,
      save_name: false
    }, folderUnicode);

    return {
      alt: altUnicode,
      url: data.Location
    };
  }


  async removeFile(name: string, folder: string): Promise<any> {
    const nameUnicode = decodeURI(name).toLowerCase();
    const folderUnicode = decodeURI(folder).toLowerCase();
    const s3 = new EasyYandexS3({
      auth: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
        secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY
      },
      Bucket: process.env.YANDEX_BUCKET,
      debug: false
    });

    const data = await s3.Remove(`${folderUnicode}/${nameUnicode}`);

    return {
      code: HttpStatus.OK,
      message: `Файл ${name} был успешно удален`
    };
  }
}
