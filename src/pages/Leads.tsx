import { SearchLeadInput } from "@/components/SearchLeadInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getLeads } from "@/http/lead/get-leads";
import { formatHours } from "@/utils/format-hours";
import { formatPhone } from "@/utils/format-phone";

import { useQuery } from "@tanstack/react-query";
import { Download, PhoneCall, Users2 } from "lucide-react";
import { toast } from "sonner";

const LeadsPage = () => {
  const { data: leads, isLoading } = useQuery({
    queryKey: ["get-leads"],
    queryFn: getLeads,
    refetchInterval: 20000,
  });

  const handleExport = (data: [] | Lead[] | undefined) => {
    if (!data || data?.length === 0) return;

    const csvData = data?.map((lead) => ({
      Nome: lead.name,
      Telefone: formatPhone(lead.phone),
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(csvData[0]).join(",") +
      "\n" +
      csvData.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Exportação concluída", {
      description: "Os contatos foram exportados com sucesso!",
    });
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-base font-bold tracking-tight">Contatos</h1>

        <Button onClick={() => handleExport(leads)}>
          <Download />
          Exportar
        </Button>
      </header>

      <SearchLeadInput />

      <section className="space-y-4">
        {leads?.map((leads) => (
          <div
            key={leads.id}
            className="border p-6 flex gap-4 bg-muted/20 rounded-xl items-center"
          >
            <div className="rounded-full bg-primary/10 text-primary p-4">
              <Users2 />
            </div>

            <div className="space-y-2">
              <b className="capitalize font-medium">{leads.name}</b>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <PhoneCall className="size-3" /> {formatPhone(leads.phone)}
              </div>

              <div className="text-xs text-muted-foreground">
                <b>Última atividade:</b>{" "}
                {formatHours(leads.matches[0].created_at)}
              </div>
              
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LeadsPage;
