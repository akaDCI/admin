import { Avatar, Flex } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next-nprogress-bar";

import Divider from "@/components/core/common/Divider";

import { userDropdownMenu } from "@/helpers/data/userDropdownMenu";
import webStorageClient from "@/utils/webStorageClient";

import * as S from "./styles";

function DropdownMenu() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();

  const sideBarMenuFormat = userDropdownMenu?.map((item: any) => ({
    ...item,
    label: item.label,
    link: `/${item.key}`,
  }));

  const handleClickItem = (key: string) => {
    switch (key) {
      case "profile":
        console.log("profile");
        break;
      case "setting":
        console.log("setting");
        break;
      case "logout":
        webStorageClient.remove("_access_token");
        router.push(`/${locale}/sign-in`);
        break;
      default:
        break;
    }
  };

  return (
    <Flex vertical>
      <Flex gap={8} align="center">
        <Avatar
          size={28}
          src={
            <Image
              src={"/images/avatar/avatar.jpg"}
              alt="avatar"
              width={28}
              height={28}
            />
          }
        />
        <Flex vertical>
          <p>Tran Van Bao Thang</p>
          <a>@sawsew467</a>
        </Flex>
      </Flex>
      <Divider $margin={8} />
      <S.MenuCustom
        items={sideBarMenuFormat}
        onClick={(e) => handleClickItem(e?.key)}
      />
    </Flex>
  );
}

export default DropdownMenu;
