type IProps = { onHandleLoad: (e: any) => void };
export function SearchForm(props: IProps) {
    const { onHandleLoad } = props;

    return (
        <div onSubmit={onHandleLoad} className="join">
            <input className="input input-bordered join-item" placeholder="Email"/>
            <button className="btn join-item rounded-r-full">Subscribe</button>
        </div>
    )
} 

/*<Form onSubmit={onHandleLoad}>
<Form.Group className="mb-3" controlId="city">
<Form.Label>Miesto pavadinimas</Form.Label>
<Form.Control type="text" placeholder="Iveskite pavadinima" />
</Form.Group>
<button className="btn btn-info">Info</button>
<button className="btn btn-success">Success</button>
<button className="btn btn-warning">Warning</button>
<button className="btn btn-error">Error</button>
</Form>*/
//<Button variant="primary" type="submit">Submit</Button>