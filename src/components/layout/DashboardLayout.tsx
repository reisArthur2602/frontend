import { getDetails } from "@/http/user/get-details";
import { UserStore } from "@/stores/user";
import { tokenUtils } from "@/utils/token";
import {
  BotMessageSquareIcon,
  ContactRoundIcon,
  HistoryIcon,
  LayoutGridIcon,
  MessageCircleReplyIcon,
  QrCode,
  User,
} from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../shared/Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    title: "Menu",
    itens: [
      {
        label: "Painel",
        href: "/dashboard",
        icon: LayoutGridIcon,
        tooltip: "Acesse a visão geral do seu painel de automações",
      },
    ],
  },
  {
    title: "Atendimento",
    itens: [
      {
        label: "Respostas Automáticas",
        href: "/dashboard/responses",
        icon: BotMessageSquareIcon,
        tooltip: "Configure mensagens automáticas para agilizar o atendimento",
      },
      {
        label: "Fila de Atendimento",
        href: "/dashboard/chat",
        icon: MessageCircleReplyIcon,
        tooltip: "Organize e acompanhe suas filas de atendimento em tempo real",
      },
    ],
  },
  {
    title: "Análises",
    itens: [
      {
        label: "Contatos",
        href: "/dashboard/contacts",
        icon: ContactRoundIcon,
        tooltip: "Gerencie e visualize todos os contatos do seu WhatsApp",
      },
      {
        label: "Histórico de atendimento",
        href: "/dashboard/historic",
        icon: HistoryIcon,
        tooltip: "Consulte o histórico completo de atendimentos realizados",
      },
    ],
  },
  {
    title: "Configurações",
    itens: [
      {
        label: "WhatsApp",
        href: "/dashboard/whatsapp",
        icon: QrCode,
        tooltip: "Configure e monitore a conexão da sua instância WhatsApp",
      },
      {
        label: "Perfil",
        href: "/dashboard/profile",
        icon: User,
        tooltip: "Atualize suas informações e preferências de perfil",
      },
    ],
  },
];

export const DashboardLayout = () => {
  const { updateUser } = UserStore();
  const navigate = useNavigate();

  const handleLoadSessionUser = async () => {
    const access_token = tokenUtils.get();
    if (!access_token) return navigate("/");

    const response = await getDetails({ access_token });
    if (!response?.user) return navigate("/");

    updateUser(response.user);
  };

  useEffect(() => {
    handleLoadSessionUser();
  }, []);

  const { pathname } = useLocation();

  const isCurrentPathName = (currentPathname: string) =>
    pathname === currentPathname;

  return (
    <div className="h-screen grid grid-cols-1 md:[grid-template-columns:280px_1fr]">
      <aside className="flex flex-col gap-4 p-6 h-full overflow-auto">
        <Logo />

        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map(({ title, itens }) => (
            <div key={title} className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground tracking-tighter font-semibold ">
                {title}
              </span>
              {itens.map((item) => (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href, { replace: false })}
                  title={item.tooltip}
                  className={cn(
                    "flex no-underline text-muted-foreground text-sm p-2 rounded-md items-center gap-2 hover:bg-muted hover:text-prima transition-all font-medium duration-100",
                    isCurrentPathName(item.href) &&
                      "bg-primary text-white hover:bg-primary/70"
                  )}
                >
                  <item.icon size={16} strokeWidth={2} />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto">UserLogged</div>
      </aside>
      <main className="p-6 min-h-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
