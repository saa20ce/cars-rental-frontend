'use client'
import { ThumbsUp } from "@/lib/ui/icons";

export const WhyUs = () => {
	return (
		<div>
			<div className="text-xl font-bold mt-10">Почему нам доверяют:</div>
			<div>
				<div className="flex flex-row">
					<div>
						<ThumbsUp />
					</div>
					<div>
						Высококачественный клиентский сервис
					</div>
				</div>
			</div>
		</div>
	);
};